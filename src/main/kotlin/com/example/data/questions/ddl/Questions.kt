package com.example.data.questions.ddl

import com.example.data.categories.ddl.Subcategories
import com.example.data.users.ddl.Users
import org.jetbrains.exposed.sql.Table
import org.joda.time.DateTime

object Questions: Table("questions") {
    val id = integer("id").primaryKey().uniqueIndex().autoIncrement()
    val subcategoryId = integer("subcategory_id").references(Subcategories.id)
    val userId = integer("user_id").references(Users.id)
    val title = text("title")
    val description = text("description")
    val date = date("date").default(DateTime.now())
    val views = integer("views").default(0)
}
