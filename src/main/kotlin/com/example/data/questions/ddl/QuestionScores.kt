package com.example.data.questions.ddl

import com.example.data.users.ddl.Users
import org.jetbrains.exposed.sql.Table

object QuestionScores: Table("question_scores") {
    val id = integer("id").primaryKey().autoIncrement()
    val userId = integer("user_id").references(Users.id)
    val questionId = integer("question_id").references(Questions.id)
    val score = integer("score")
}