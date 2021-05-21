package com.example.routings

import com.example.model.Status
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.pipeline.*
import kotlin.text.get

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

fun Route.getAndHandleException(path: String, action: suspend (PipelineContext<Unit, ApplicationCall>) -> Unit) {
    get(path) {
        handleException(call) {
            action(this)
        }
    }
}

fun Route.postAndHandleException(path: String, action: suspend (PipelineContext<Unit, ApplicationCall>) -> Unit) {
    post(path) {
        handleException(call) {
            action(this)
        }
    }
}

fun Route.deleteAndHandleException(path: String, action: suspend (PipelineContext<Unit, ApplicationCall>) -> Unit) {
    delete (path) {
        handleException(call) {
            action(this)
        }
    }
}