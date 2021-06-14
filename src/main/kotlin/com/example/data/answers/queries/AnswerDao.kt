package com.example.data.answers.queries

import com.example.data.answers.ddl.AnswerScores
import com.example.data.answers.ddl.Answers
import com.example.data.answers.model.Answer
import com.example.data.answers.model.AnswerScore
import com.example.data.answers.model.AnswerWithRating
import com.example.data.common.Id
import com.example.data.questions.model.Question
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

object AnswerDao {

    fun create(new: Answer): Id = transaction {
        Answers.insert {
            it[questionId] = new.questionId
            it[userId] = new.userId
            it[answer] = new.answer
        }[Answers.id].let { Id(it) }
    }

    fun getById(id: Int): Answer = transaction {
        Answers
            .select { Answers.id eq id }
            .map { it.toAnswer() }
            .firstOrNull() ?: throw IllegalArgumentException("Нет ответа с таким id")
    }

    private fun ResultRow.toAnswer(): Answer =
        Answer(
            id = this[Answers.id],
            questionId = this[Answers.questionId],
            userId = this[Answers.userId],
            answer = this[Answers.answer],
            isBest = this[Answers.isBest]
        )

    fun getForQuestion(questionId: Int): List<AnswerWithRating> = transaction {
        Answers
            .leftJoin(AnswerScores)
            .slice(
                Answers.id,
                Answers.questionId,
                Answers.userId,
                Answers.answer,
                AnswerScores.score.avg(),
                Answers.isBest
            )
            .select { Answers.questionId eq questionId }
            .groupBy(
                Answers.id,
                Answers.userId,
                Answers.questionId,
                Answers.answer,
                Answers.isBest
            ).map {
                AnswerWithRating(
                    id = it[Answers.id],
                    questionId = it[Answers.questionId],
                    userId = it[Answers.userId],
                    answer = it[Answers.answer],
                    averageRating = it[AnswerScores.score.avg()]?.toDouble() ?: 0.0,
                    isBest = it[Answers.isBest]
                )
            }
    }

    fun Question.answers() = getForQuestion(this.id)

    private fun getBestForQuestion(questionId: Int): Answer? = transaction {
        Answers
            .select { Answers.questionId.eq(questionId) and Answers.isBest.eq(true) }
            .map { it.toAnswer() }
            .firstOrNull()
    }

    fun setBest(answer: Answer) = transaction {
        getBestForQuestion(answer.questionId)?.let { old ->
            update(old.copy(isBest = false))
        }
        update(answer.copy(isBest = true))
    }

    fun update(new: Answer) = transaction {
        Answers.update({ Answers.id eq new.id }) {
            it[questionId] = new.questionId
            it[userId] = new.userId
            it[answer] = new.answer
        }
    }


    fun createScore(new: AnswerScore): Id = transaction {
        updateScore(new)
        try {
            AnswerScores.insert {
                it[id] = new.id
                it[userId] = new.userId
                it[answerId] = new.answerId
                it[score] = new.score
            }[AnswerScores.id].let { Id(it) }
        } catch (e: Exception) {
            Id(new.id)
        }
    }

    private fun updateScore(new: AnswerScore) = transaction {
        AnswerScores
            .update({ AnswerScores.id eq new.id }) {
                it[score] = new.score
            }
    }

    fun delete(id: Int): Unit = transaction { Answers.deleteWhere { Answers.id eq id } }

}