package com.example.data.categories.ddl

import org.jetbrains.exposed.sql.Table

object Subcategories: Table("subcategories") {
    val id = integer("id").primaryKey().autoIncrement()
    val categoryId = integer("category_id").references(Categories.id)
    val name = varchar("name", 64)
}