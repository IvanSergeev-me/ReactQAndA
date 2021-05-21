package com.example.routings

import com.example.controllers.UserController
import com.example.model.User
import io.ktor.routing.*
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.request.*

fun Route.userRouting() {
    route("/user") {

        getAndHandleException("/exists/{login}/{password}") {
            val login = it.call.parameters["login"] ?: return@getAndHandleException it.call.badRequest()
            val password = it.call.parameters["password"] ?: return@getAndHandleException it.call.badRequest()
//                call.response.headers.append("Set-Cookie", "id=123123")
//                println(call.request.cookies["id"])
            it.call.respond(UserController.exists(login, password))
        }

        getAndHandleException("/{id}") {
            val id = it.call.parameters["id"] ?: return@getAndHandleException it.call.badRequest()
            it.call.respond(UserController.getById(id.toInt()))
        }


        postAndHandleException("/create") {
            val user = it.call.receive<User>()
            it.call.respond(UserController.create(user))
        }

        postAndHandleException("/update") {
            val new = it.call.receive<User>()
            UserController.update(new)
            it.call.ok()
        }

        deleteAndHandleException("/delete/{login}") {
            val login = it.call.parameters["login"] ?: return@deleteAndHandleException it.call.badRequest()
            UserController.delete(login)
            it.call.ok()
        }
    }
}
