package com.example.data.answers.model

import kotlinx.serialization.Serializable

@Serializable
data class AnswerWithRating(
    val id: Int,
    val questionId: Int,
    val userId: Int,
    val averageRating: Double,
    val answer: String,
    val isBest: Boolean
)