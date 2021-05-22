package com.example.model

import kotlinx.serialization.Serializable

@Serializable
data class Id(
    val id: Int
)

@Serializable
data class Status(
    val status: String,
    val message: String = ""
)

@Serializable
data class User(
    val id: Int,
    val login: String,
    val password: String,
    val image: String
)

@Serializable
data class UserShort(
    val id: Int,
    val login: String,
    val image: String,
)

@Serializable
data class UserAuth(
    val login: String,
    val password: String,
    val rememberMe: Boolean
)

@Serializable
data class Token(
    val token: String,
    val userId: Int
)

@Serializable
data class Category(
    val id: Int,
    val name: String
)

@Serializable
data class Subcategory(
    val id: Int,
    val categoryId: Int,
    val name: String
)

@Serializable
data class Question(
    val id: Int,
    val subcategoryId: Int,
    val userId: Int,
    val title: String,
    val description: String
)

@Serializable
data class QuestionFull(
    val id: Int,
    val category: String,
    val subcategory: String,
    val date: String,
    val views: Int,
    val answers: Int,
    val averageRating: Double,
    val author: UserShort,
    val title: String,
    val text: String,
    val isAnswerGiven: Boolean
)

@Serializable
data class QuestionInfo (
    val question: QuestionFull,
    val answers: List<AnswerWithRating>
)

@Serializable
data class Answer(
    val id: Int,
    val questionId: Int,
    val userId: Int,
    val answer: String,
    val isAnswerGiven: Boolean
)

@Serializable
data class AnswerWithRating(
    val id: Int,
    val questionId: Int,
    val userId: Int,
    val averageRating: Double,
    val answer: String,
    val isBest: Boolean
)

@Serializable
data class AnswerScore (
    val id: Int,
    val userId: Int,
    val answerId: Int,
    val score: Int
)

@Serializable
data class QuestionScore (
    val id: Int,
    val userId: Int,
    val questionId: Int,
    val score: Int
)

@Serializable
data class AnswerRated(
    val answer: Answer,
    val score: AnswerScore
)

@Serializable
data class QuestionRated(
    val question: Question,
    val score: QuestionScore
)