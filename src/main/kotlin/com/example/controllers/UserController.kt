package com.example.controllers

import com.example.model.Id
import com.example.model.User
import com.example.model.Users
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

object UserController {
    fun create(user: User): Id = Id(
        transaction {
            Users.insert {
                it[login] = user.login
                it[password] = user.password
            }[Users.id]
        }
    )

    fun exists(login: String, password: String): Int = transaction {
        Users.select {
            Users.login.eq(login) and Users.password.eq(password)
        }.map {
            User(
                id = it[Users.id],
                login = it[Users.login],
                password = it[Users.password]
            )
        }.firstOrNull()?.id ?: 0
    }

    fun getById(id: Int): User = transaction {
        Users
            .select { Users.id eq id }
            .map {
                User(
                    id = it[Users.id],
                    login = it[Users.login],
                    password = "hidden"
                )
            }.firstOrNull() ?: throw IllegalArgumentException("Нет пользователя с таким id")
    }

    fun delete(login: String) {
        transaction {
            Users.deleteWhere { Users.login.eq(login) }
        }
    }

    fun update(user: User) {
        transaction {
            Users.update({ Users.id.eq(user.id) }) {
                it[login] = user.login
                it[password] = user.password
            }
        }
    }
}
