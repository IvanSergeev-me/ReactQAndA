package com.example.routings

import com.example.data.questions.model.Question
import com.example.data.questions.model.QuestionScore
import com.example.data.questions.queries.QuestionDao
import io.ktor.application.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.questionRouting() {
    route("/question") {
        getAndHandleException("/all") {
            call.respond(QuestionDao.getAll())
        }

        getAndHandleException("/forSubcategory/{subcategoryId}") {
            val subcategoryId = call.parameters["subcategoryId"] ?: return@getAndHandleException call.badRequest()
            call.respond(QuestionDao.getForSubcategory(subcategoryId.toInt()))
        }

        getAndHandleException("/forUser/{id}") {
            val id = call.parameters["id"] ?: return@getAndHandleException call.badRequest()
            call.respond(QuestionDao.getForUser(id.toInt()))
        }

        getAndHandleException("/search/{query}") {
            val query = call.parameters["query"] ?: return@getAndHandleException call.badRequest()
            call.respond(QuestionDao.search(query))
        }

        getAndHandleException("/info/{id}") {
            val id = call.parameters["id"] ?: return@getAndHandleException call.badRequest()
            call.respond(QuestionDao.getInfo(id.toInt()))
        }

        postAndHandleException("/create") {
            val question = call.receive<Question>().copy(userId = safeCookieToken().toInt())
            call.respond(QuestionDao.create(question))
        }

        postAndHandleException("/update") {
            val question = call.receive<Question>()
//            checkAuthAndRun(question.userId) {
                QuestionDao.update(question)
                call.ok()
//            }
        }

        postAndHandleException("/createScore") {
            val score = call.receive<QuestionScore>().copy(userId = safeCookieToken().toInt())
            call.respond(QuestionDao.createScore(score))
        }

        deleteAndHandleException("/delete/{id}") {
            val id = call.parameters["id"] ?: return@deleteAndHandleException call.badRequest()
//            checkAuthAndRun(QuestionDao.getById(id.toInt()).id) {
                QuestionDao.delete(id.toInt())
                call.ok()
//            }
        }
    }
}