package com.example.routings

import com.example.data.categories.queries.CategoryDao
import com.example.data.categories.queries.SubcategoryDao
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.categoryRouting() {
    route("/category") {
        getAndHandleException("/list") {
            call.respond(CategoryDao.getList())
        }
    }

    route("/subcategory") {
        getAndHandleException("/forCategory/{categoryId}") {
            val categoryId = call.parameters["categoryId"] ?: return@getAndHandleException call.badRequest()
            call.respond(SubcategoryDao.getForCategory(categoryId.toInt()))
        }
    }
}