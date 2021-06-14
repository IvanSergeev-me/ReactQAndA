package com.example.data.questions.model

import kotlinx.serialization.Serializable

@Serializable
data class QuestionScore (
    val id: Int,
    val userId: Int,
    val questionId: Int,
    val score: Int
)