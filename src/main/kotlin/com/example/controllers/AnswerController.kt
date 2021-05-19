package com.example.controllers

import com.example.model.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

object AnswerController {
    fun create(new: Answer): Id = transaction {
        Id(
            Answers.insert {
                it[questionId] = new.questionId
                it[userId] = new.userId
                it[answer] = new.answer
            }[Answers.id]
        )
    }

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

    fun getRated(userId: Int): List<AnswerRated> = transaction {
        AnswerScores
            .leftJoin(Answers)
            .select { AnswerScores.userId eq userId }
            .map {
                AnswerRated(
                    Answer(
                        id = it[Answers.id],
                        questionId = it[Answers.questionId],
                        userId = it[Answers.userId],
                        answer = it[Answers.answer],
                        isAnswerGiven = it[Answers.isBest]
                    ),
                    AnswerScore(
                        id = it[AnswerScores.id],
                        userId = it[AnswerScores.userId],
                        answerId = it[AnswerScores.answerId],
                        score = it[AnswerScores.score]
                    )
                )
            }
    }

    fun delete(id: Int) {
        transaction {
            Answers.deleteWhere { Answers.id eq id }
        }
    }

    fun update(new: Answer) {
        transaction {
            Answers.update({ Answers.id eq new.id }) {
                it[questionId] = new.questionId
                it[userId] = new.userId
                it[answer] = new.answer
            }
        }
    }

    fun createScore(new: AnswerScore): Id = transaction {
        AnswerScores.insert {
            it[id] = new.id
            it[userId] = new.userId
            it[answerId] = new.answerId
            it[score] = new.score
        }[AnswerScores.id].let { Id(it) }
    }
}

