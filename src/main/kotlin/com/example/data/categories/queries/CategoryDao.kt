package com.example.data.categories.queries

import com.example.data.categories.ddl.Categories
import com.example.data.categories.model.Category
import com.example.data.categories.model.Subcategory
import com.example.data.categories.queries.SubcategoryDao.subcategory
import com.example.data.questions.model.Question
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

object CategoryDao {

    fun getList(): List<Category> = transaction {
        Categories.selectAll().map {
            Category(
                id = it[Categories.id],
                name = it[Categories.name]
            )
        }
    }

    private fun getById(id: Int): Category = transaction {
        Categories
            .select { Categories.id eq id }
            .map {
                Category(
                    id = it[Categories.id],
                    name = it[Categories.name]
                )
            }.firstOrNull() ?: throw IllegalArgumentException("Нет категории с таким id")
    }

    fun Subcategory.category() = getById(this.categoryId)

    fun Question.category(): Category = subcategory().category()
}

