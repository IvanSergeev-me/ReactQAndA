package com.example.routings

import com.example.data.common.Id
import com.example.data.users.model.User
import com.example.data.users.queries.TokenDao.deleteToken
import com.example.data.users.queries.TokenDao.saveToken
import com.example.data.users.queries.TokenDao.token
import com.example.data.users.queries.UserDao
import com.example.data.users.queries.UserDao.setIdIfExists
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
    }

    postAndHandleException("/register") {
        val user = call.receive<User>()
        val new = UserDao.create(user)
        new.saveToken()
        call.response.headers.append("Set-Cookie", "$COOKIE_NAME_AUTH_TOKEN=${new.token}")
        call.respond(new)
    }

    postAndHandleException("/auth") {
        val user = call.receive<User>().copy(id = 0).setIdIfExists()
        if (user.id > 0) {
            user.saveToken()
            setAuthCookie(user.token)
            call.respond(user)
        } else {
            throw IllegalArgumentException("Неверный логин или пароль")
        }
    }

    postAndHandleException("/update") {
        val new = call.receive<User>()
        checkAuthAndRun(new.token) {
            UserDao.update(new)
            call.ok()
        }
    }

    deleteAndHandleException("/signout") {
        val id = call.receive<Id>()
        id.deleteToken()
        setAuthCookie(COOKIE_VALUE_DELETED)
    }
}

fun PipelineContext<Unit, ApplicationCall>.setAuthCookie(cookie: Any) {
    call.response.headers.append("Set-Cookie", "$COOKIE_NAME_AUTH_TOKEN=$cookie")
}