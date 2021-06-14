package com.example.data.categories.ddl

import org.jetbrains.exposed.sql.Table

object Categories: Table("categories") {
    val id = integer("id").primaryKey().autoIncrement()
    val name = varchar("name", 64)
}