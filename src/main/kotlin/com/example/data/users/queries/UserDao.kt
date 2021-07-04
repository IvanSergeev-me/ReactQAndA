package com.example.data.users.queries

import com.example.data.answers.model.Answer
import com.example.data.questions.model.Question
import com.example.data.users.ddl.Users
import com.example.data.users.model.User
import com.example.data.users.model.UserShort
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

object UserDao {

    private fun toUserShort(row: ResultRow): UserShort =
        UserShort(
            id = row[Users.id],
            login = row[Users.login],
            image = row[Users.image],
            isAdmin = row[Users.isAdmin]
        )

    private fun toUser(row: ResultRow): User =
        User(
            id = row[Users.id],
            login = row[Users.login],
            password = row[Users.password],
            image = row[Users.image],
            isAdmin = row[Users.isAdmin]
        )

    fun getById(id: Int): UserShort = transaction {
        Users
            .select { Users.id eq id }
            .map(::toUserShort)
            .firstOrNull() ?: throw IllegalArgumentException("Нет пользователя с таким id")
    }

    fun getAll(): List<UserShort> = transaction {
        Users
            .selectAll()
            .map(::toUserShort)
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
                image = user.image,
                isAdmin = user.isAdmin
            )
        }
    }

    private fun check(login: String, password: String): User = transaction {
        Users
            .select { Users.login.eq(login) and Users.password.eq(password) }
            .map(::toUser)
            .firstOrNull()
            ?: throw IllegalArgumentException("Неверный логин или пароль")
    }

    fun User.check(): User = check(login, password)

    fun update(user: User): Unit = transaction {
        Users.update({ Users.id.eq(user.id) }) {
            it[login] = user.login
            it[password] = user.password
            it[image] = user.image
            it[isAdmin] = user.isAdmin
        }
    }

    fun Question.author(): UserShort = getById(this.userId)

    fun Int.asUser(): UserShort = getById(this)
    fun delete(id: Int) = transaction {
        Users.deleteWhere { Users.id eq id }
    }
}