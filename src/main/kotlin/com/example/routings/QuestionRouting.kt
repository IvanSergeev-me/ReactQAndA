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
        getAndHandleException("/all") {
            it.call.respond(QuestionController.getAll())
        }

        getAndHandleException("/forSubcategory/{subcategoryId}") {
            val subcategoryId = it.call.parameters["subcategoryId"] ?: return@getAndHandleException it.call.badRequest()
            it.call.respond(QuestionController.getForSubcategory(subcategoryId.toInt()))
        }

        getAndHandleException("/forUser/{userId}") {
            val userId = it.call.parameters["userId"] ?: return@getAndHandleException it.call.badRequest()
            it.call.respond(QuestionController.getForUser(userId.toInt()))
        }

        getAndHandleException("/forUserRated/{userId}") {
            val userId = it.call.parameters["userId"] ?: return@getAndHandleException it.call.badRequest()
            it.call.respond(QuestionController.getRated(userId.toInt()))
        }

        getAndHandleException("/search/{query}") {
            val query = it.call.parameters["query"] ?: return@getAndHandleException it.call.badRequest()
            it.call.respond(QuestionController.search(query))
        }

        getAndHandleException("/info/{id}") {
            val id = it.call.parameters["id"] ?: return@getAndHandleException it.call.badRequest()
            it.call.respond(QuestionController.getInfo(id.toInt()))
        }

        postAndHandleException("/create") {
            val question = it.call.receive<Question>()
            it.call.respond(QuestionController.create(question))
        }

        postAndHandleException("/createScore") {
            val score = it.call.receive<QuestionScore>()
            it.call.respond(QuestionController.createScore(score))
        }

        postAndHandleException("/update") {
            val question = it.call.receive<Question>()
            QuestionController.update(question)
            it.call.ok()
        }

        deleteAndHandleException("/delete/{id}") {
            val id = it.call.parameters["id"] ?: return@deleteAndHandleException it.call.badRequest()
            QuestionController.delete(id.toInt())
            it.call.ok()
        }
    }
}