package com.example.routings

import com.example.controllers.SubcategoryController
import com.example.model.Subcategory
import io.ktor.application.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.subcategoryRouting() {
    route("/subcategory") {
        get("/forCategory/{categoryId}") {
            try {
                val categoryId = call.parameters["categoryId"] ?: return@get call.badRequest()
                call.respond(SubcategoryController.getForCategory(categoryId.toInt()))
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        post("/create") {
            try {
                val subcategory = call.receive<Subcategory>()
                call.respond(SubcategoryController.create(subcategory))
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        post("/update") {
            try {
                val subcategory = call.receive<Subcategory>()
                SubcategoryController.update(subcategory)
                call.ok()
            } catch (t: Throwable) {
                call.exception(t)
            }
        }

        delete("delete/{id}") {
            try {
                val id = call.parameters["id"] ?: return@delete call.badRequest()
                SubcategoryController.delete(id.toInt())
                call.ok()
            } catch (t: Throwable) {
                call.exception(t)
            }
        }
    }
}