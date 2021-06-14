package com.example.data.questions.model

import com.example.data.answers.model.AnswerWithRating
import kotlinx.serialization.Serializable

@Serializable
data class QuestionInfo (
    val question: QuestionFull,
    val answers: List<AnswerWithRating>
)