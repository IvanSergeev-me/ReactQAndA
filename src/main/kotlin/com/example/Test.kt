package com.example

import com.example.controllers.QuestionController
import com.example.model.*
import io.ktor.util.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction
import org.postgresql.util.PSQLException


fun main() {
//    Database.connect(
//        url = "jdbc:postgresql://localhost:5432/cp4",
//        driver = "org.postgresql.Driver",
//        user = "postgres",
//        password = "0000"
//    )
//
//    transaction {
//        SchemaUtils.create( // if not exists
//            Answers,
//            Categories,
//            Questions,
//            Subcategories,
//            Users,
//            QuestionScores,
//            AnswerScores,
//            Tokens
//        )
//    }

//    val user = User(12123123, "asdssadsdsdsdsdsdkjkytdtetdtdtdtttd", "0000")
//    println(user.token())
}

private fun User.token() =
    "%x".format(("" + login.hashCode() + id).toBigInteger())
        .let { it.padStart(32 - it.length, '0') }

data class U(
    val id: Int,
    val login: String,
    val password: String,
)
