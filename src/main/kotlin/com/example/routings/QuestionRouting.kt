package com.example.routings

import com.example.controllers.QuestionController
import com.example.model.Question
import com.example.model.QuestionScore
import io.ktor.application.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.questionRouting() {
    route("/question") {
        get("/all") {
            try {
                call.respond(QuestionController.getAll())
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        get("/forSubcategory/{subcategoryId}") {
            try {
                val subcategoryId = call.parameters["subcategoryId"] ?: return@get call.badRequest()
                call.respond(QuestionController.getForSubcategory(subcategoryId.toInt()))
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        get("/forUser/{userId}") {
            try {
                val userId = call.parameters["userId"] ?: return@get call.badRequest()
                call.respond(QuestionController.getForUser(userId.toInt()))
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        get("/forUserRated/{userId}") {
            try {
                val userId = call.parameters["userId"] ?: return@get call.badRequest()
                call.respond(QuestionController.getRated(userId.toInt()))
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        get("/search/{query}") {
            try {
                val query = call.parameters["query"] ?: return@get call.badRequest()
                call.respond(QuestionController.search(query))
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        get("/info/{id}") {
            val id = call.parameters["id"] ?: return@get call.badRequest()
            call.respond(QuestionController.getInfo(id.toInt()))
        }

        post("/create") {
            try {
                val question = call.receive<Question>()
                call.respond(QuestionController.create(question))
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        post("/createScore") {
            try {
                val score = call.receive<QuestionScore>()
                call.respond(QuestionController.createScore(score))
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        post("/update") {
            try {
                val question = call.receive<Question>()
                QuestionController.update(question)
                call.ok()
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        delete("/delete/{id}") {
            try {
                val id = call.parameters["id"] ?: return@delete call.badRequest()
                QuestionController.delete(id.toInt())
                call.ok()
            } catch (t: Throwable) {
                call.exception(t)
            }
        }
    }
}