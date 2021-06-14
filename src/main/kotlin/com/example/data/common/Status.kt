package com.example.data.common

import kotlinx.serialization.Serializable

@Serializable
data class Status(
    val status: String,
    val message: String = ""
)