package com.example.routings

import com.example.controllers.CategoryController
import com.example.model.Category
import io.ktor.application.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.categoryRouting() {
    route("/category") {
        get("/list") {
            try {
                call.respond(CategoryController.getList())
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        post("/create") {
            try {
                val category = call.receive<Category>()
                call.respond(CategoryController.create(category))
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        post("/update") {
            try {
                val category = call.receive<Category>()
                CategoryController.update(category)
                call.ok()
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        delete("/delete/{id}") {
            try {
                val id = call.parameters["id"] ?: return@delete call.badRequest()
                CategoryController.delete(id.toInt())
                call.ok()
            } catch (t: Throwable) {
                call.exception(t)
            }
        }
    }
}