package com.example.controllers

import com.example.model.Category
import com.example.model.Id
import com.example.model.Subcategories
import com.example.model.Subcategory
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update

object SubcategoryController {
    fun create(subcategory: Subcategory): Id = Id(
        transaction {
            Subcategories.insert {
                it[Subcategories.categoryId] = subcategory.categoryId
                it[Subcategories.name] = subcategory.name
            }[Subcategories.id]
        }
    )

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

    fun getById(id: Int): Subcategory = transaction {
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

    fun delete(id: Int) {
        transaction {
            Subcategories.deleteWhere { Subcategories.id eq id }
        }
    }

    fun update(subcategory: Subcategory) {
        transaction {
            Subcategories.update({ Subcategories.id eq subcategory.id }) {
                it[categoryId] = subcategory.categoryId
                it[name] = subcategory.name
            }
        }
    }
}