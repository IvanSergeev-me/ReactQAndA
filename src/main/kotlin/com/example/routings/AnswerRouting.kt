package com.example.routings

import com.example.controllers.AnswerController
import com.example.model.Answer
import com.example.model.AnswerScore
import io.ktor.application.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.answerRouting() {
    route("/answer") {
        getAndHandleException("/forQuestion/{questionId}") {
            val questionId = it.call.parameters["questionId"] ?: return@getAndHandleException it.call.badRequest()
            it.call.respond(AnswerController.getForQuestion(questionId.toInt()))
        }

        getAndHandleException("/forUser/{userId}") {
            val userId = it.call.parameters["userId"] ?: return@getAndHandleException it.call.badRequest()
            it.call.respond(AnswerController.getRated(userId.toInt()))
        }

        postAndHandleException("/create") {
            val answer = it.call.receive<Answer>()
            it.call.respond(AnswerController.create(answer))
        }

        postAndHandleException("/createScore") {
            val score = it.call.receive<AnswerScore>()
            it.call.respond(AnswerController.createScore(score))
        }

        postAndHandleException("/update") {
            val answer = it.call.receive<Answer>()
            AnswerController.update(answer)
            it.call.ok()
        }

        deleteAndHandleException("/delete/{id}") {
            val id = it.call.parameters["id"] ?: return@deleteAndHandleException it.call.badRequest()
            AnswerController.delete(id.toInt())
            it.call.ok()
        }
    }
}