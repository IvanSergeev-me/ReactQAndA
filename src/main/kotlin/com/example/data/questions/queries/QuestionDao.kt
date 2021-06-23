package com.example.data.questions.queries

import com.example.data.answers.ddl.AnswerScores
import com.example.data.answers.ddl.Answers
import com.example.data.answers.model.Answer
import com.example.data.answers.queries.AnswerDao
import com.example.data.answers.queries.AnswerDao.answers
import com.example.data.categories.queries.CategoryDao.category
import com.example.data.categories.queries.SubcategoryDao.subcategory
import com.example.data.common.Id
import com.example.data.questions.ddl.QuestionScores
import com.example.data.questions.ddl.Questions
import com.example.data.questions.model.Question
import com.example.data.questions.model.QuestionFull
import com.example.data.questions.model.QuestionInfo
import com.example.data.questions.model.QuestionScore
import com.example.data.users.queries.UserDao.author
import io.ktor.util.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.DeleteStatement.Companion.where
import org.jetbrains.exposed.sql.transactions.transaction
import org.joda.time.DateTime

object QuestionDao {

    fun create(question: Question): Id = transaction {
        Questions.insert {
            it[subcategoryId] = question.subcategoryId
            it[userId] = question.userId
            it[title] = question.title
            it[description] = question.description
        }
    }[Questions.id].let { Id(it) }

    fun getById(id: Int): Question = transaction {
        Questions.select { Questions.id eq id }
            .map { it.toQuestion() }
            .firstOrNull() ?: throw IllegalArgumentException("Нет вопроса с таким id")
    }

    fun Answer.question() = getById(this.questionId)

    private fun Join.sliceForFullQuestion() =
        this.slice(
            Questions.id,
            Questions.subcategoryId,
            Questions.userId,
            Questions.title,
            Questions.description,
            QuestionScores.score.avg(),
            Questions.date,
            Questions.views
        )

    private fun Query.groupForFullQuestion() =
        this.groupBy(
            Questions.id,
            Questions.subcategoryId,
            Questions.userId,
            Questions.title,
            Questions.description,
            Questions.date,
            Questions.views
        )

    private fun ResultRow.toQuestion(): Question =
        Question(
            this[Questions.id],
            this[Questions.subcategoryId],
            this[Questions.userId],
            this[Questions.title],
            this[Questions.description]
        )

    private fun get(where: SqlExpressionBuilder.() -> Op<Boolean>): List<QuestionFull> = transaction {
        Questions
            .leftJoin(QuestionScores)
            .sliceForFullQuestion()
            .select(where)
            .groupForFullQuestion()
            .map { row ->
                row.toQuestion().run {
                    val subcategory = subcategory()
                    val category = subcategory.category()
                    val answers = answers()
                    QuestionFull(
                        id = id,
                        category = category.name,
                        subcategory = subcategory.name,
                        author = author(),
                        title = title,
                        text = description,
                        averageRating = row[QuestionScores.score.avg()]?.toDouble() ?: 0.0,
                        date = row[Questions.date].toString("yy-MM-dd"),
                        views = row[Questions.views],
                        answers = answers.size,
                        isAnswerGiven = answers.any { it.isBest }
                    )
                }
            }
    }

    fun getAll() = get { Questions.id greater 0 }

    fun getForSubcategory(subcategoryId: Int) = get { Questions.subcategoryId eq subcategoryId }

    fun getForUser(userId: Int): List<QuestionFull> = get { Questions.userId eq userId }

    private fun getOneFull(id: Int): QuestionFull = get { Questions.id eq id }
        .firstOrNull() ?: throw IllegalArgumentException("Нет вопроса с таким id")

    private fun incViews(id: Int) {
        transaction {
            Questions.update({ Questions.id eq id }) {
                with(SqlExpressionBuilder) {
                    it.update(views, views + 1)
                }
            }
        }
    }

    fun getInfo(id: Int): QuestionInfo = transaction {
        incViews(id)
        QuestionInfo(
            getOneFull(id),
            AnswerDao.getForQuestion(id)
        )
    }

    fun delete(id: Int): Unit = transaction {
        AnswerScores.deleteWhere { AnswerScores.answerId inList AnswerDao.getAnswerIdsForQuestion(id) }
        QuestionScores.deleteWhere { QuestionScores.questionId eq id }
        Answers.deleteWhere { Answers.questionId eq id }
        Questions.deleteWhere { Questions.id eq id } }

    fun update(question: Question): Unit = transaction {
        Questions.update({ Questions.id eq question.id }) {
            it[subcategoryId] = question.subcategoryId
            it[title] = question.title
            it[description] = question.description
        }
    }

    fun createScore(new: QuestionScore): Id = transaction {
        updateScore(new)
        try {
            QuestionScores.insert {
                it[userId] = new.userId
                it[questionId] = new.questionId
                it[score] = new.score
            }[QuestionScores.id].let { Id(it) }
        } catch (e: Exception) {
            Id(new.id)
        }

    }

    private fun updateScore(new: QuestionScore) = transaction {
        QuestionScores.update({ QuestionScores.id eq new.id }) {
            it[score] = new.score
        }
    }

    fun search(query: String): List<QuestionFull> = transaction {
        val rs = connection.createStatement().executeQuery(
            "select q.*, avg(score) as avg " +
                    "from questions as q " +
                    "left join question_scores qs on q.id = qs.question_id " +
                    "where ts_rank(to_tsvector('russian', title), plainto_tsquery('russian', '$query')) > 0.0001 " +
                    "or ts_rank(to_tsvector('russian', description), plainto_tsquery('russian', '$query')) > 0.000001 " +
                    "group by q.id, q.subcategory_id, q.user_id, q.title, q.description, q.date, q.views " +
                    "order by ts_rank(to_tsvector('russian', title), plainto_tsquery('russian', '$query')) desc;"
        )
        mutableListOf<QuestionFull>().also { list ->
            while (rs.next()) Question(
                id = rs.getInt("id"),
                userId = rs.getInt("user_id"),
                subcategoryId = rs.getInt("subcategory_id"),
                title = rs.getString("title"),
                description = rs.getString("description")
            ).run {
                val subcategory = subcategory()
                val category = subcategory.category()
                val answers = answers()
                list.add(QuestionFull(
                    id = id,
                    category = category.name,
                    subcategory = subcategory.name,
                    author = author(),
                    title = title,
                    text = description,
                    averageRating = rs.getDouble("avg")?.toDouble() ?: 0.0,
                    date = DateTime(rs.getDate("date").time).toString("yy-MM-dd"),
                    views = rs.getInt("views"),
                    answers = answers.size,
                    isAnswerGiven = answers.any { it.isBest }
                ))
            }
            rs.close()
        }
    }
}