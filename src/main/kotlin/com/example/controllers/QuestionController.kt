package com.example.controllers

import com.example.model.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

object QuestionController {
    fun create(question: Question): Id = Id(
        transaction {
            Questions.insert {
                it[subcategoryId] = question.subcategoryId
                it[userId] = question.userId
                it[title] = question.title
                it[description] = question.description
            }
        }[Questions.id]
    )

    private fun rowToFullQuestion(row: ResultRow) = QuestionFull(
        id = row[Questions.id],
        category = row[Questions.subcategoryId].let { subId ->
            SubcategoryController.getById(subId).categoryId.let { catId ->
                CategoryController.getById(catId).name
            }
        },
        subcategory = row[Questions.subcategoryId].let { subId ->
            SubcategoryController.getById(subId).name
        },
        author = UserController.getById(row[Questions.userId]),
        title = row[Questions.title],
        text = row[Questions.description],
        averageRating = row[QuestionScores.score.avg()]?.toDouble() ?: 0.0,
        date = row[Questions.date].toString("yy-MM-dd"),
        views = row[Questions.views],
        answers = row[Questions.id].let { queId ->
            AnswerController.getForQuestion(queId).size
        },
        isAnswerGiven = row[Questions.id].let { queId ->
            AnswerController.getForQuestion(queId)
                .any { it.isBest }
        }
    )

    fun getAll(): List<QuestionFull> = transaction {
        Questions
            .leftJoin(QuestionScores)
            .slice(
                Questions.id,
                Questions.subcategoryId,
                Questions.userId,
                Questions.title,
                Questions.description,
                QuestionScores.score.avg(),
                Questions.date,
                Questions.views
            )
            .selectAll()
            .groupBy(Questions.id, Questions.subcategoryId, Questions.userId, Questions.title, Questions.description, Questions.date, Questions.views)
            .map { rowToFullQuestion(it) }
    }


    fun getForSubcategory(subcategoryId: Int): List<QuestionFull> = transaction {
        Questions
            .leftJoin(QuestionScores)
            .slice(
                Questions.id,
                Questions.subcategoryId,
                Questions.userId,
                Questions.title,
                Questions.description,
                QuestionScores.score.avg(),
                Questions.date,
                Questions.views
            )
            .select { Questions.subcategoryId eq subcategoryId }
            .groupBy(Questions.id, Questions.subcategoryId, Questions.userId, Questions.title, Questions.description, Questions.date, Questions.views)
            .map { rowToFullQuestion(it) }
    }

    fun getForUser(userId: Int): List<QuestionFull> = transaction {
        Questions.leftJoin(QuestionScores)
            .slice(
                Questions.id,
                Questions.subcategoryId,
                Questions.userId,
                Questions.title,
                Questions.description,
                QuestionScores.score.avg(),
                Questions.date,
                Questions.views
            )
            .select { Questions.userId eq userId }
            .groupBy(Questions.id, Questions.subcategoryId, Questions.userId, Questions.title, Questions.description, Questions.date, Questions.views)
            .map { rowToFullQuestion(it) }
    }

    fun getRated(userId: Int): List<QuestionRated> = transaction {
        QuestionScores
            .leftJoin(Questions)
            .select { QuestionScores.userId eq userId }
            .map {
                QuestionRated(
                    Question(
                        id = it[Questions.id],
                        subcategoryId = it[Questions.subcategoryId],
                        userId = it[Questions.userId],
                        title = it[Questions.title],
                        description = it[Questions.description]
                    ),
                    QuestionScore(
                        id = it[QuestionScores.id],
                        userId = it[QuestionScores.userId],
                        questionId = it[QuestionScores.questionId],
                        score = it[QuestionScores.score]
                    )
                )
            }
    }

    private fun getOneFull(id: Int): QuestionFull = transaction {
        Questions.leftJoin(QuestionScores)
            .slice(
                Questions.id,
                Questions.subcategoryId,
                Questions.userId,
                Questions.title,
                Questions.description,
                QuestionScores.score.avg(),
                Questions.date,
                Questions.views
            )
            .select { Questions.id eq id }
            .groupBy(Questions.id, Questions.subcategoryId, Questions.userId, Questions.title, Questions.description, Questions.date, Questions.views)
            .map { rowToFullQuestion(it) }
            .firstOrNull() ?: throw IllegalArgumentException("Нет вопроса с таким id")
    }

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
            AnswerController.getForQuestion(id)
        )
    }

    fun delete(id: Int) {
        transaction {
            Questions.deleteWhere { Questions.id eq id }
        }
    }

    fun update(question: Question) {
        transaction {
            Questions.update({ Questions.id eq question.id }) {
                it[subcategoryId] = question.subcategoryId
                it[title] = question.title
                it[description] = question.description
            }
        }
    }

    fun createScore(new: QuestionScore): Id = transaction {
        QuestionScores.insert {
            it[userId] = new.userId
            it[questionId] = new.questionId
            it[score] = new.score
        }[QuestionScores.id].let { Id(it) }
    }

    fun search(query: String): List<Question> = transaction {
        val rs = connection.createStatement().executeQuery(
            "select questions.* " +
                    "from questions " +
                    "where " +
                    "   ts_rank(to_tsvector('russian', title), plainto_tsquery('russian', '$query')) > 0.0001 " +
                    "   or ts_rank(to_tsvector('russian', description), plainto_tsquery('russian', '$query')) > 0.000001 " +
                    "order by ts_rank(to_tsvector('russian', title), plainto_tsquery('russian', '$query')) desc;"
        )
        mutableListOf<Question>().apply {
            while (rs.next()) add(
                Question(
                    id = rs.getInt("id"),
                    userId = rs.getInt("user_id"),
                    subcategoryId = rs.getInt("subcategory_id"),
                    title = rs.getString("title"),
                    description = rs.getString("description")
                )
            )
            rs.close()
        }
    }
}