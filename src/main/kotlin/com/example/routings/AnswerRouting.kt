package com.example.routings

import com.example.controllers.AnswerController
import com.example.model.Answer
import com.example.model.AnswerScore
import com.example.model.Status
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.answerRouting() {
    route("/answer") {
        get("/forQuestion/{questionId}") {
            try {
                val questionId = call.parameters["questionId"] ?: return@get call.badRequest()
                call.respond(AnswerController.getForQuestion(questionId.toInt()))
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        get("/forUser/{userId}") {
            try {
                val userId = call.parameters["userId"] ?: return@get call.badRequest()
                call.respond(AnswerController.getRated(userId.toInt()))
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        post("/create") {
            try {
                val answer = call.receive<Answer>()
                call.respond(AnswerController.create(answer))
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        post("/createScore") {
            try {
                val score = call.receive<AnswerScore>()
                call.respond(AnswerController.createScore(score))
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        post("/update") {
            try {
                val answer = call.receive<Answer>()
                AnswerController.update(answer)
                call.ok()
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        delete("/delete/{id}") {
            try {
                val id = call.parameters["id"] ?: return@delete call.badRequest()
                AnswerController.delete(id.toInt())
                call.ok()
            } catch (t: Throwable) {
                call.exception(t)
            }
        }
    }
}