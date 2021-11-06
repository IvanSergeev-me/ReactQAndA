package com.example

import com.example.data.answers.ddl.AnswerScores
import com.example.data.answers.ddl.Answers
import com.example.data.categories.ddl.Categories
import com.example.data.categories.ddl.Subcategories
import com.example.data.questions.ddl.QuestionScores
import com.example.data.questions.ddl.Questions
import com.example.data.users.ddl.Tokens
import com.example.data.users.ddl.Users
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.example.routings.*
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.serialization.*
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

fun main() {
    embeddedServer(Netty, port = 8080, host = "localhost") {
        module()
    }.start(wait = true)
}


fun initDatabase() {
    Database.connect(
        url = "jdbc:postgresql://localhost:5432/cp4",
        driver = "org.postgresql.Driver",
        user = "postgres",
        password = "1337"
    )

    transaction {
        SchemaUtils.create( // if not exists
            Users,
            Categories,
            Subcategories,
            Questions,
            Answers,
            QuestionScores,
            AnswerScores,
            Tokens
        )
    }
}

fun Application.module() {
    install(ContentNegotiation) {
        install(CORS){
//            host("localhost:3030")
            anyHost()
            method(HttpMethod.Options)
            method(HttpMethod.Delete)
            header(HttpHeaders.XForwardedProto)
            allowCredentials = true
            allowNonSimpleContentTypes = true
        }
        json()
        initDatabase()
        install(Routing) {
            registerRoutes()
        }
    }
}

fun Application.registerRoutes() {
    routing {
        get("/") {
            call.respondText("OK")
        }
        answerRouting()
        categoryRouting()
        questionRouting()
        userRouting()
    }
}