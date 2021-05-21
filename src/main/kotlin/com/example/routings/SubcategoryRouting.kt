package com.example.routings

import com.example.controllers.SubcategoryController
import com.example.model.Subcategory
import io.ktor.application.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.subcategoryRouting() {
    route("/subcategory") {
        getAndHandleException("/forCategory/{categoryId}") {
            val categoryId = it.call.parameters["categoryId"] ?: return@getAndHandleException it.call.badRequest()
            it.call.respond(SubcategoryController.getForCategory(categoryId.toInt()))
        }

        postAndHandleException("/create") {
            val subcategory = it.call.receive<Subcategory>()
            it.call.respond(SubcategoryController.create(subcategory))
        }

        postAndHandleException("/update") {
            val subcategory = it.call.receive<Subcategory>()
            SubcategoryController.update(subcategory)
            it.call.ok()
        }

        deleteAndHandleException("delete/{id}") {
            val id = it.call.parameters["id"] ?: return@deleteAndHandleException it.call.badRequest()
            SubcategoryController.delete(id.toInt())
            it.call.ok()
        }
    }
}