package com.example.data.questions.model

import com.example.data.users.model.UserShort
import kotlinx.serialization.Serializable

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