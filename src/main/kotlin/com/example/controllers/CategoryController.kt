package com.example.controllers

import com.example.model.Categories
import com.example.model.Category
import com.example.model.Id
import com.example.model.Users
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

object CategoryController {
    fun create(category: Category): Id = transaction {
        Id(
            Categories.insert {
                it[Categories.name] = category.name
            }[Categories.id]
        )
    }

    fun getList(): List<Category> = transaction {
        Categories.selectAll().map {
            Category(
                id = it[Categories.id],
                name = it[Categories.name]
            )
        }
    }

    fun getById(id: Int): Category = transaction {
        Categories
            .select { Categories.id eq id }
            .map {
                Category(
                    id = it[Categories.id],
                    name = it[Categories.name]
                )
            }.firstOrNull() ?: throw IllegalArgumentException("Нет категории с таким id")
    }

    fun delete(id: Int) {
        transaction {
            Categories.deleteWhere { Users.login eq id }
        }
    }

    fun update(category: Category) {
        transaction {
            Categories.update({ Users.id eq category.id }) {
                it[name] = category.name
            }
        }
    }
}