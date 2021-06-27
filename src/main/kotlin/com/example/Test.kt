package com.example

import com.example.data.answers.model.Answer
import com.example.data.answers.queries.AnswerDao
import com.example.data.questions.queries.QuestionDao
import com.example.data.users.model.User
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.transactions.transaction

fun main() {

    Database.connect(
        url = "jdbc:postgresql://localhost:5432/cp4",
        driver = "org.postgresql.Driver",
        user = "postgres",
        password = "0000"
    )

    transaction {
        AnswerDao.setBest(Answer(1, 1, 2, "", false))
    }
}