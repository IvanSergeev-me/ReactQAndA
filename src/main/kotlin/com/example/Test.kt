package com.example

import com.example.data.answers.ddl.AnswerScores
import com.example.data.answers.ddl.Answers
import com.example.data.categories.ddl.Categories
import com.example.data.categories.ddl.Subcategories
import com.example.data.questions.ddl.QuestionScores
import com.example.data.questions.ddl.Questions
import com.example.data.questions.queries.QuestionDao
import com.example.data.users.ddl.Tokens
import com.example.data.users.ddl.Users
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

fun main() {

    Database.connect(
        url = "jdbc:postgresql://localhost:5432/cp4",
        driver = "org.postgresql.Driver",
        user = "postgres",
        password = "0000"
    )

    transaction {
        SchemaUtils.create( // if not exists
            Answers,
            Categories,
            Questions,
            Subcategories,
            Users,
            QuestionScores,
            AnswerScores,
            Tokens
        )
    }
}