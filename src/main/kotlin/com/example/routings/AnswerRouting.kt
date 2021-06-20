package com.example.routings

import com.example.data.answers.model.Answer
import com.example.data.answers.model.AnswerScore
import com.example.data.answers.queries.AnswerDao
import com.example.data.questions.queries.QuestionDao.question
import io.ktor.application.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.answerRouting() {

    route("/answer") {
        getAndHandleException("/forQuestion/{questionId}") {
            val questionId = call.parameters["questionId"] ?: return@getAndHandleException call.badRequest()
            call.respond(AnswerDao.getForQuestion(questionId.toInt()))
        }

        getAndHandleException("/forUser/{id}") {
            val id = call.parameters["id"] ?: return@getAndHandleException call.badRequest()
            call.respond(AnswerDao.getForUser(id.toInt()))
        }

        postAndHandleException("/create") {
            val answer = call.receive<Answer>()
            call.respond(AnswerDao.create(answer))
        }

        postAndHandleException("/createScore") {
            val score = call.receive<AnswerScore>()
            call.respond(AnswerDao.createScore(score))
        }

        postAndHandleException("/setBest/{answerId}") {
            val answerId = call.parameters["answerId"] ?: return@postAndHandleException call.badRequest()
            val answer = AnswerDao.getById(answerId.toInt())
//            checkAuthAndRun(answer.question().userId) {
                AnswerDao.setBest(answer)
                call.ok()
//            }
        }

        postAndHandleException("/update") {
            val answer = call.receive<Answer>()
//            checkAuthAndRun(answer.userId) {
                AnswerDao.update(answer)
                call.ok()
//            }
        }

        deleteAndHandleException("/delete/{id}") {
            val id = call.parameters["id"] ?: return@deleteAndHandleException call.badRequest()
//            checkAuthAndRun(AnswerDao.getById(id.toInt()).userId) {
                AnswerDao.delete(id.toInt())
                call.ok()
//            }
        }
    }
}