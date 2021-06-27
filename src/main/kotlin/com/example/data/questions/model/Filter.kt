package com.example.data.questions.model

import kotlinx.serialization.Serializable

@Serializable
enum class Sorting { DATE, ALPHABET, RATING }

@Serializable
data class GetParameters(
    val sorting: Sorting, // 0 (date) or 1 (alphabet) or 2 (rating)
    val dateFrom: String,
)

