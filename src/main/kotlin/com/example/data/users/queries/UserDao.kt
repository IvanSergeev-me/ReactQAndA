package com.example.data.users.queries

import com.example.data.answers.model.Answer
import com.example.data.questions.model.Question
import com.example.data.users.ddl.Users
import com.example.data.users.model.User
import com.example.data.users.model.UserShort
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update

object UserDao {

    fun getById(id: Int): UserShort = transaction {
        Users
            .select { Users.id eq id }
            .map {
                UserShort(
                    id = it[Users.id],
                    login = it[Users.login],
                    image = it[Users.image]
                )
            }.firstOrNull() ?: throw IllegalArgumentException("Нет пользователя с таким id")
    }

    fun create(user: User): User = transaction {
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

    private fun check(login: String, password: String): Int = transaction {
        Users.select {
            Users.login.eq(login) and Users.password.eq(password)
        }.firstOrNull()
            ?.get(Users.id)
            ?: throw IllegalArgumentException("Неверный логин или пароль")
    }

    fun User.setIdIfExists(): User = this.copy(id = check(login, password))

    fun update(user: User): Unit = transaction {
        Users.update({ Users.id.eq(user.id) }) {
            it[login] = user.login
            it[password] = user.password
        }
    }

    fun Question.author(): UserShort = getById(this.userId)

    fun Answer.author(): UserShort = getById(this.userId)


}