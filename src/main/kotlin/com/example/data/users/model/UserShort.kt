package com.example.data.users.model

import kotlinx.serialization.Serializable

@Serializable
data class UserShort(
    val id: Int,
    val login: String,
    val image: String?,
    val isAdmin: Boolean = false
)