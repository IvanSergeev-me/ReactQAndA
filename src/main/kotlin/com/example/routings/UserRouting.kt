package com.example.routings

import com.example.controllers.UserController
import com.example.model.User
import io.ktor.routing.*
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.request.*

fun Route.userRouting() {
    route("/user") {

        get("/exists/{login}/{password}") {
            try {
                val login = call.parameters["login"] ?: return@get call.badRequest()
                val password = call.parameters["password"] ?: return@get call.badRequest()
                call.respond(UserController.exists(login, password))
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        get("/{id}") {
            try {
                val id = call.parameters["id"] ?: return@get call.badRequest()
                call.respond(UserController.getById(id.toInt()))
            } catch (t: Throwable) {
                call.exception(t)
            }
        }


        post("/create") {
            try {
                val user = call.receive<User>()
                call.respond(UserController.create(user))
            } catch (t: Throwable) {
                call.exception(t)
            }

        }

        post("/update") {
            try {
                val new = call.receive<User>()
                UserController.update(new)
                call.ok()
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        delete("/delete/{login}") {
            try {
                val login = call.parameters["login"] ?: return@delete call.badRequest()
                UserController.delete(login)
                call.ok()
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

    }
}
