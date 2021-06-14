package com.example.data.answers.ddl

import com.example.data.users.ddl.Users
import org.jetbrains.exposed.sql.Table

object AnswerScores: Table("answer_scores") {
    val id = integer("id").primaryKey().autoIncrement()
    val userId = integer("user_id").references(Users.id)
    val answerId = integer("answer_id").references(Answers.id)
    val score = integer("score")
}