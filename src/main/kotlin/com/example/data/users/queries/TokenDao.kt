package com.example.data.users.queries

import com.example.data.users.ddl.Tokens
import com.example.data.users.model.User
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

object TokenDao {
    private fun delete(id: Int): Unit = transaction {
        Tokens.deleteWhere { Tokens.userId eq id }
    }

    fun User.deleteToken() = delete(this.id)

    private fun create(id: Int): Unit = transaction {
        Tokens.insert { it[userId] = id }
    }

    fun User.saveToken() = create(this.id)

    private fun check(token: Int): Boolean = transaction {
        Tokens.select { Tokens.userId eq token }.empty().not()
    }

    fun User.tokenSaved(): Boolean = check(this.id)

    val User.token: Int
        get() = this.id
}