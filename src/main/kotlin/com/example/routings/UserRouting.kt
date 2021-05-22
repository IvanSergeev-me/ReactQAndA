package com.example.routings

import com.example.controllers.UserController
import com.example.model.User
import io.ktor.routing.*
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.request.*

const val COOKIE_NAME_AUTH_TOKEN = "auth-token"

fun Route.userRouting() {
    route("/user") {
        getAndHandleException("/{id}") {
            val id = it.call.parameters["id"] ?: return@getAndHandleException it.call.badRequest()
            it.call.respond(UserController.getById(id.toInt()))
        }

        postAndHandleException("/register") {
            val user = it.call.receive<User>()
            val (new, token) = UserController.register(user)
            it.call.response.headers.append("Set-Cookie", "$COOKIE_NAME_AUTH_TOKEN=${token.token}")
            it.call.respond(new)
        }

        postAndHandleException("/auth") {
            val user = it.call.receive<User>()
            val (checked, token) = UserController.auth(user)
            if (checked.id > 0) {
                it.call.response.headers.append("Set-Cookie", "$COOKIE_NAME_AUTH_TOKEN=${token.token}")
                it.call.respond(checked)
            } else {
                throw IllegalArgumentException("Неверный логин или пароль")
            }
        }

        deleteAndHandleException("/signout") {
            val user = it.call.receive<User>()
            UserController.deleteToken(user)
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
