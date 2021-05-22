package com.example.controllers

import com.example.model.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

object UserController {

    private fun User.token(): String =
        "%x".format(("" + login.hashCode() + id).toBigInteger())
            .let {
                if (it.length < 32 )
                    it.padStart(32 - it.length, '0')
                else
                    it
            }

    fun nullUser(): User = User(0, "null", "null", "https://otvet.imgsmail.ru/download/41080312_a3fe5cece4de5bc646fc456e0edef711_800.jpg")

    private fun create(user: User): User = transaction {
            Users.insert {
                it[login] = user.login
                it[password] = user.password
            }.let {
                User(
                    id = it[Users.id],
                    login = user.login,
                    password = user.password,
                    image = user.image
                )
            }
        }

    private fun saveToken(user: User): Unit = transaction {
        Tokens.insert {
            it[token] = user.token()
            it[userId] = user.id
        }
    }

    fun deleteToken(user: User): Unit = transaction {
        Tokens.deleteWhere { Tokens.userId eq user.id }
    }

    private fun checkUser(login: String, password: String): User = transaction {
        Users.select {
            Users.login.eq(login) and Users.password.eq(password)
        }.map {
            User(
                id = it[Users.id],
                login = it[Users.login],
                password = it[Users.password],
                image = it[Users.image]
            )
        }.firstOrNull() ?: throw IllegalArgumentException("Неверный логин или пароль")
    }

    fun register(user: User): Pair<User, Token> = transaction {
        val new = create(user)
        saveToken(new)
        Pair(new, Token(new.token(), new.id))
    }

    fun auth(user: User): Pair<User, Token> = transaction {
        val checked = checkUser(user.login, user.password)
        saveToken(checked)
        Pair(checked, Token(checked.token(), checked.id))
    }

    fun signout(user: User) {
        deleteToken(user)
    }

    fun getById(id: Int): User = transaction {
        Users
            .select { Users.id eq id }
            .map {
                User(
                    id = it[Users.id],
                    login = it[Users.login],
                    password = "hidden",
                    image = it[Users.image]
                )
            }.firstOrNull() ?: throw IllegalArgumentException("Нет пользователя с таким id")
    }

    fun getByToken(token: String): User = transaction {
        Tokens
            .leftJoin(Users)
            .select { Tokens.token eq token }
            .map {
                User(
                    id = it[Users.id],
                    login = it[Users.login],
                    password = "hidden",
                    image = it[Users.image]
                )
            }.firstOrNull() ?: nullUser()
    }

    fun delete(login: String) {
        // TODO: 22.05.2021 нужно удалять токен здесь
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
