package com.example.data.users.model

import kotlinx.serialization.Serializable

@Serializable
data class Token(
    val token: String,
    val userId: Int
)