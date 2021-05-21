package com.example.routings

import com.example.controllers.CategoryController
import com.example.model.Category
import io.ktor.application.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.categoryRouting() {
    route("/category") {
        getAndHandleException("/list") {
            it.call.respond(CategoryController.getList())
        }

        postAndHandleException("/create") {
            val category = it.call.receive<Category>()
            it.call.respond(CategoryController.create(category))
        }

        postAndHandleException("/update") {
            val category = it.call.receive<Category>()
            CategoryController.update(category)
            it.call.ok()
        }

        deleteAndHandleException("/delete/{id}") {
            val id = it.call.parameters["id"] ?: return@deleteAndHandleException it.call.badRequest()
            CategoryController.delete(id.toInt())
            it.call.ok()
        }
    }
}