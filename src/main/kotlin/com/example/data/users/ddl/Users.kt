package com.example.data.users.ddl

import org.jetbrains.exposed.sql.Table

object Users: Table("users") {
    val id = integer("id").primaryKey().autoIncrement()
    val login = varchar("login", 64).uniqueIndex()
    val password = varchar("password", 64)
    val image = text("image").nullable()
    val isAdmin = bool("is_admin").default(false)
}