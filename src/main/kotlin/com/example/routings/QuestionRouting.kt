package com.example.routings

import com.example.data.questions.model.GetParameters
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

        postAndHandleException("/all") {
//            val filters = call.tryReceiveFilter()
            val filters = call.receive<GetParameters>()
            call.respond(QuestionDao.getAll(filters))
        }

        getAndHandleException("/forSubcategory/{subcategoryId}") {
            val subcategoryId = call.parameters["subcategoryId"] ?: return@getAndHandleException call.badRequest()
            call.respond(QuestionDao.getForSubcategory(subcategoryId.toInt()))
        }

        postAndHandleException("/forSubcategory/{subcategoryId}") {
            val subcategoryId = call.parameters["subcategoryId"] ?: return@postAndHandleException call.badRequest()
            val filters = call.tryReceiveFilter()
            call.respond(QuestionDao.getForSubcategory(subcategoryId.toInt(), filters))
        }

        getAndHandleException("/forUser/{id}") {
            val id = call.parameters["id"] ?: return@getAndHandleException call.badRequest()
            call.respond(QuestionDao.getForUser(id.toInt()))
        }

        postAndHandleException("/forUser/{id}") {
            val id = call.parameters["id"] ?: return@postAndHandleException call.badRequest()
            val filters = call.tryReceiveFilter()
            call.respond(QuestionDao.getForUser(id.toInt(), filters))
        }

        getAndHandleException("/search/{query}") {
            val query = call.parameters["query"] ?: return@getAndHandleException call.badRequest()
            call.respond(QuestionDao.search(query))
        }

//        postAndHandleException("/search/{query}") {
//            val query = call.parameters["query"] ?: return@postAndHandleException call.badRequest()
//            val filters = call.tryReceiveFilter()
//            call.respond(QuestionDao.search(query, filters))
//        }

        getAndHandleException("/info/{id}") {
            val id = call.parameters["id"] ?: return@getAndHandleException call.badRequest()
            call.respond(QuestionDao.getInfo(id.toInt()))
        }

        postAndHandleException("/create") {
            val question = call.receive<Question>()
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
            val score = call.receive<QuestionScore>()
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