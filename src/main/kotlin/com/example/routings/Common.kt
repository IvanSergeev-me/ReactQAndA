package com.example.routings

import com.example.model.Status
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.util.pipeline.*

suspend fun ApplicationCall.ok() {
    respond(Status("ok"))
}

suspend fun ApplicationCall.badRequest() {
    respond(HttpStatusCode.BadRequest)
}

suspend fun ApplicationCall.exception(t: Throwable) {
    respond(Status("exception", t.message ?: ""))
}