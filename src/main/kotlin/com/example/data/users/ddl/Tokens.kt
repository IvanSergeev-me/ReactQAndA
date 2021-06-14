package com.example.data.users.ddl

import org.jetbrains.exposed.sql.Table

object Tokens: Table("tokens") {
    val userId = integer("user_id").primaryKey().references(Users.id)
}