package com.example.data.questions.model

import kotlinx.serialization.Serializable

@Serializable
enum class Sorting { DATE, ALPHABET, RATING }

@Serializable
data class GetParameters(
    val sorting: Sorting, // DATE or ALPHABET or RATING
    val dateFrom: String,
)

