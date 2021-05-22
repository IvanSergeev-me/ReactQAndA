package com.example.routings

import com.example.controllers.QuestionController
import com.example.controllers.UserController
import com.example.model.Question
import com.example.model.QuestionScore
import com.example.model.QuestionsAndCurrentUser
import io.ktor.application.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.questionRouting() {
    route("/question") {
        getAndHandleException("/all") {
            it.call.respond(QuestionController.getAll())
            val token = it.call.request.cookies[COOKIE_NAME_AUTH_TOKEN] ?: ""
            val data = QuestionsAndCurrentUser(
                UserController.getByToken(token),
                QuestionController.getAll()
            )

            it.call.respond(data)
        }

        getAndHandleException("/forSubcategory/{subcategoryId}") {
            val subcategoryId = it.call.parameters["subcategoryId"] ?: return@getAndHandleException it.call.badRequest()
            val token = it.call.request.cookies[COOKIE_NAME_AUTH_TOKEN] ?: ""
            val data = QuestionsAndCurrentUser(
                UserController.getByToken(token),
                QuestionController.getForSubcategory(subcategoryId.toInt())
            )

            it.call.respond(data)
        }

        getAndHandleException("/forUser/{userId}") {
            val userId = it.call.parameters["userId"] ?: return@getAndHandleException it.call.badRequest()
            val token = it.call.request.cookies[COOKIE_NAME_AUTH_TOKEN] ?: ""
            val data = QuestionsAndCurrentUser(
                UserController.getByToken(token),
                QuestionController.getForUser(userId.toInt())
            )

            it.call.respond(data)
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