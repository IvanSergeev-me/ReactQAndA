package com.example.model

import org.jetbrains.exposed.sql.Table
import org.joda.time.DateTime

object Users: Table("users") {
    val id = integer("id").primaryKey().autoIncrement()
    val login = varchar("login", 64).uniqueIndex()
    val password = varchar("password", 64)
    val image = text("image")
}

object Categories: Table("categories") {
    val id = integer("id").primaryKey().autoIncrement()
    val name = varchar("name", 64)
}

object Subcategories: Table("subcategories") {
    val id = integer("id").primaryKey().autoIncrement()
    val categoryId = integer("category_id").references(Categories.id)
    val name = varchar("name", 64)
}

object Questions: Table("questions") {
    val id = integer("id").primaryKey().autoIncrement()
    val subcategoryId = integer("subcategory_id").references(Subcategories.id)
    val userId = integer("user_id").references(Users.id)
    val title = text("title")
    val description = text("description")
    val date = date("date").default(DateTime.now())
    val views = integer("views").default(0)
}

object Answers: Table("answers") {
    val id = integer("id").primaryKey().autoIncrement()
    val questionId = integer("question_id").references(Questions.id)
    val userId = integer("user_id").references(Users.id)
    val answer = text("answer")
    val isBest = bool("is_best").default(false)
}

object AnswerScores: Table("answer_scores") {
    val id = integer("id").primaryKey().autoIncrement()
    val userId = integer("user_id").references(Users.id)
    val answerId = integer("answer_id").references(Answers.id)
    val score = integer("score")
}

object QuestionScores: Table("question_scores") {
    val id = integer("id").primaryKey().autoIncrement()
    val userId = integer("user_id").references(Users.id)
    val questionId = integer("question_id").references(Questions.id)
    val score = integer("score")
}