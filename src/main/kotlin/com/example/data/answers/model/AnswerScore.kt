package com.example.data.answers.model

import kotlinx.serialization.Serializable

@Serializable
data class AnswerScore (
    val id: Int,
    val userId: Int,
    val answerId: Int,
    val score: Int
)