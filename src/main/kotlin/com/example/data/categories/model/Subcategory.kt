package com.example.data.categories.model

import kotlinx.serialization.Serializable

@Serializable
data class Subcategory(
    val id: Int,
    val categoryId: Int,
    val name: String
)