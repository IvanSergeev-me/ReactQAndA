package com.example.data.questions.model

import kotlinx.serialization.Serializable

@Serializable
data class Question(
    val id: Int,
    val subcategoryId: Int,
    val userId: Int,
    val title: String,
    val description: String
)