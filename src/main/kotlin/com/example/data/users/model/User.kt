package com.example.data.users.model

import kotlinx.serialization.Serializable

@Serializable
data class User(
    val id: Int,
    val login: String,
    val password: String,
    val image: String
)