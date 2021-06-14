package com.example.data.categories.queries

import com.example.data.categories.ddl.Subcategories
import com.example.data.categories.model.Subcategory
import com.example.data.questions.model.Question
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

object SubcategoryDao {

    fun getForCategory(categoryId: Int): List<Subcategory> = transaction {
        Subcategories.select {
            Subcategories.categoryId eq categoryId
        }.map {
            Subcategory(
                id = it[Subcategories.id],
                categoryId = it[Subcategories.categoryId],
                name = it[Subcategories.name]
            )
        }
    }

    private fun getById(id: Int): Subcategory = transaction {
        Subcategories
            .select { Subcategories.id eq id }
            .map {
                Subcategory(
                    id = it[Subcategories.id],
                    categoryId = it[Subcategories.categoryId],
                    name = it[Subcategories.name]
                )
            }.firstOrNull() ?: throw IllegalArgumentException("Нет подкатегории с таким id")
    }

    fun Question.subcategory() = getById(this.subcategoryId)
}