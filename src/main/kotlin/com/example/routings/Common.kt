package com.example.routings

import com.example.data.common.Status
import com.example.data.questions.model.GetParameters
import com.example.data.users.queries.TokenDao.token
import com.example.data.users.queries.UserDao
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.pipeline.*

const val COOKIE_NAME_AUTH_TOKEN = "auth-token"
const val COOKIE_VALUE_DELETED = "-1"

suspend fun ApplicationCall.ok() {
    respond(Status("ok"))
}

suspend fun ApplicationCall.badRequest() {
    respond(HttpStatusCode.BadRequest)
}

suspend fun ApplicationCall.exception(t: Throwable) {
    respond(Status("exception", t.message ?: ""))
}

suspend fun handleException(call: ApplicationCall, action: suspend () -> Unit) {
    try {
        action()
    } catch (t: Throwable) {
        call.exception(t)
    }
}

fun Route.getAndHandleException(path: String, action: suspend PipelineContext<Unit, ApplicationCall>.() -> Unit) {
    get(path) {
        handleException(call) {
            action()
        }
    }
}

fun Route.postAndHandleException(path: String, action: suspend PipelineContext<Unit, ApplicationCall>.() -> Unit) {
    post(path) {
        handleException(call) {
            action()
        }
    }
}

fun Route.deleteAndHandleException(path: String, action: suspend PipelineContext<Unit, ApplicationCall>.() -> Unit) {
    delete(path) {
        handleException(call) {
            action()
        }
    }
}

inline fun PipelineContext<Unit, ApplicationCall>.checkAuthAndRun(
    token: Int,
    action: PipelineContext<Unit, ApplicationCall>.() -> Unit
) = if (token == cookieToken().toInt()) action()
else throw IllegalArgumentException("Ошибка авторизации.")

fun PipelineContext<Unit, ApplicationCall>.cookieToken() =
    call.request.cookies[COOKIE_NAME_AUTH_TOKEN] ?: COOKIE_VALUE_DELETED

fun PipelineContext<Unit, ApplicationCall>.safeCookieToken(): String =
    if (cookieToken() != COOKIE_VALUE_DELETED) cookieToken()
    else throw IllegalArgumentException("Ошибка авторизации.")

suspend fun ApplicationCall.tryReceiveFilter(): GetParameters? =
    try {
        receive()
    } catch (e: Throwable) {
        null
    }
