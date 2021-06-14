package com.example.data.answers.model

import kotlinx.serialization.Serializable

@Serializable
data class Answer(
    val id: Int,
    val questionId: Int,
    val userId: Int,
    val answer: String,
    val isBest: Boolean
)