package com.example.data.answers.ddl

import com.example.data.questions.ddl.Questions
import com.example.data.users.ddl.Users
import org.jetbrains.exposed.sql.Table

object Answers: Table("answers") {
    val id = integer("id").primaryKey().autoIncrement()
    val questionId = integer("question_id").references(Questions.id)
    val userId = integer("user_id").references(Users.id)
    val answer = text("answer")
    val isBest = bool("is_best").default(false)
}