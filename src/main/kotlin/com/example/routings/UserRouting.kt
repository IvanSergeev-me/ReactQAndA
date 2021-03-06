package com.example.routings

import com.example.data.common.Id
import com.example.data.users.model.User
import com.example.data.users.queries.TokenDao.deleteToken
import com.example.data.users.queries.TokenDao.saveToken
import com.example.data.users.queries.TokenDao.token
import com.example.data.users.queries.UserDao
import com.example.data.users.queries.UserDao.check
import io.ktor.application.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.pipeline.*

fun Route.userRouting() {
    route("/user") {
        getAndHandleException("/{id}") {
            val id = call.parameters["id"] ?: return@getAndHandleException call.badRequest()
            call.respond(UserDao.getById(id.toInt()))
        }

        getAndHandleException("/all") {
            call.respond(UserDao.getAll())
        }

        postAndHandleException("/register") {
            val user = call.receive<User>()
            val new = UserDao.create(user)
            new.saveToken()
            call.response.headers.append("Set-Cookie", "$COOKIE_NAME_AUTH_TOKEN=${new.token}")
            call.respond(new)
        }

        postAndHandleException("/auth") {
            val user = call.receive<User>().check()
            user.saveToken()
            setAuthCookie(user.token)
            call.respond(user)
        }

        postAndHandleException("/update") {
            val new = call.receive<User>()
//            checkAuthAndRun(new.token) {
                UserDao.update(new)
                call.ok()
//            }
        }

        deleteAndHandleException("/signout") {
            val id = call.receive<Id>()
            id.deleteToken()
            setAuthCookie(COOKIE_VALUE_DELETED)
        }

        deleteAndHandleException("/delete/{id}") {
            val id = call.parameters["id"] ?: return@deleteAndHandleException call.badRequest()
            UserDao.delete(id.toInt())

        }
    }
}

fun PipelineContext<Unit, ApplicationCall>.setAuthCookie(cookie: Any) {
    call.response.headers.append("Set-Cookie", "$COOKIE_NAME_AUTH_TOKEN=$cookie")
}