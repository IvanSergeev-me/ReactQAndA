package com.example.data.answers.model

import com.example.data.users.model.UserShort
import kotlinx.serialization.Serializable

@Serializable
data class AnswerWithRating(
    val id: Int,
    val questionId: Int,
    val author: UserShort,
    val averageRating: Double,
    val answer: String,
    val isBest: Boolean
)