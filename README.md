###  Base URL http://localhost:8080

###  Стандартная ошибка

```kotlin
data class Status(
    val status: String, // = "exception"
    val message: String = "" // текст ошибки
)
```

## Users

### /user/{id} - GET
Возвращает данные пользователя:
```kotlin
data class UserShort(
    val id: Int,
    val login: String,
    val image: String // URL
)
```

### /user/register - POST
Создает нового пользователя. Если пользователь успешно создан,
устанавливается cookie с токеном пользователя

COOKIE_NAME_AUTH_TOKEN = "auth-token"

Принимает json:
```kotlin
data class User(
    val id: Int, // может быть любым
    val login: String,
    val password: String,
    val image: String // URL
)
```
Возвращает такого же пользователя, но с актуальным id

### /user/auth - POST
Авторизация пользователя. Если пользователь авторизован создан,
устанавливается cookie с токеном пользователя

Принимает json:
```kotlin
data class User(
    val id: Int, // может быть любым
    val login: String,
    val password: String,
    val image: String // URL
)
```
### /user/update - POST
Обновляет данные пользователя. Находит пользователя по id 
и устанавливает данные из остальных полей.

Нельзя изменить id.

Пользователь может изменить только свой аккаунт

Принимает json:
```kotlin
data class User(
    val id: Int, // может быть любым
    val login: String,
    val password: String,
    val image: String // URL
)
```
Возвращает
```kotlin
data class Status(
    val status: String, // = "ok"
    val message: String = "" // ""
)
```

### /user/signout - DELETE
Осуществляет выход из аккаунта. Удаляет cookie

Принимает json:
```kotlin
data class Id(
    val id: Int
)
```
Возвращает
```kotlin
data class Status(
    val status: String, // = "ok"
    val message: String = "" // ""
)
```

## Questions

### /question/all - GET
Ничего не принимает

Возвращает все вопросы

```kotlin
List<QuestionFull> // Корневой элемент

data class QuestionFull(
    val id: Int,
    val category: String,
    val subcategory: String,
    val date: String,
    val views: Int,
    val answers: Int,
    val averageRating: Double,
    val author: UserShort, // Описан ниже
    val title: String,
    val text: String,
    val isAnswerGiven: Boolean
)

data class UserShort(
    val id: Int,
    val login: String,
    val image: String,
)
```
### /question/forSubcategory/{subcategoryId} - GET
Возвращает список вопросов для подкатегории. Структура ответа как у getAll.

### /question/forUser - GET
Возвращает список вопросов для пользователя. Берет пользователя из cookie. Структура ответа как у getAll.

### /question/search/{query} - GET
Поиск. Структура ответа как у getAll.

### /question/info/{id} - GET
Информация о вопросе.

Ответ:
```kotlin
data class QuestionInfo ( // корневой элемент
    val question: QuestionFull, 
    val answers: List<AnswerWithRating>
)

data class QuestionFull(
    val id: Int,
    val category: String,
    val subcategory: String,
    val date: String,
    val views: Int,
    val answers: Int,
    val averageRating: Double,
    val author: UserShort,
    val title: String,
    val text: String,
    val isAnswerGiven: Boolean
)

data class UserShort(
    val id: Int,
    val login: String,
    val image: String,
)

data class AnswerWithRating(
    val id: Int,
    val questionId: Int,
    val userId: Int,
    val averageRating: Double,
    val answer: String,
    val isBest: Boolean
)

```

### /question/create - POST

Создает новый вопрос

Принимает:
```kotlin
data class Question(
    val id: Int, // может быть любым
    val subcategoryId: Int,
    val userId: Int, // может быть любым, берет из cookie
    val title: String,
    val description: String
)
```
Ответ:
```kotlin
data class Id(
    val id: Int
)
```

### /question/update - POST
Обновляет вопрос. Ищет вопрос по id и устанавливает значения из остальных полей

Принимает:
```kotlin
data class Question(
    val id: Int,
    val subcategoryId: Int,
    val userId: Int,
    val title: String,
    val description: String
)
```
Ответ:
```kotlin
data class Status(
    val status: String, // "ok"
    val message: String = ""
)
```

### /question/createScore - POST
Создает оценку к вопросу.
Если оценка уже была создана этим пользователем к этому вопросу,
обновит оценку.

Принимает:
```kotlin
data class QuestionScore (
    val id: Int, // может быть любым
    val userId: Int, // может быть любым, берет из cookie
    val questionId: Int,
    val score: Int // от 0 до 5
)
```
Ответ:
```kotlin
data class Id( // id новой оценки
    val id: Int
)
```

### /question/delete/{id} - DELETE
Удаляет вопрос. Может быть удален только 
тем пользователем, который его создал

Ответ:
```kotlin
data class Status(
    val status: String, // "ok"
    val message: String = ""
)
```

## Answers

### /answer/forQuestion/{questionId} - GET
Список подкатегорий для категории

Ответ:
```kotlin
List<AnswerWithRating> // корневой элемент

data class AnswerWithRating(
    val id: Int,
    val questionId: Int,
    val userId: Int,
    val averageRating: Double,
    val answer: String,
    val isBest: Boolean
)
```

### /answer/create - POST
Создает ответ

Принимает:
```kotlin
data class Answer(
    val id: Int, // может быть любым
    val questionId: Int,
    val userId: Int, // может быть любым, берет из cookie
    val answer: String,
    val isBest: Boolean
)
```
Ответ:
```kotlin
data class Id( // id нового ответа
    val id: Int
)
```

### /answer/createScore - POST
Создает оценку к ответу.
Если оценка уже была создана этим пользователем к этому ответу,
обновит оценку.

Принимает:
```kotlin
data class AnswerScore (
    val id: Int, // может быть любым
    val userId: Int,
    val answerId: Int,
    val score: Int
)
```

Ответ:
```kotlin
data class Id( // id новой оценки
    val id: Int
)
```

### /answer/setBest/{answerId} - POST
Выбирает ответ как лучший. Переназначит, 
если вопрос уже имеет лучший ответ

Доступно только владельцу вопроса

Ответ:
```kotlin
data class Status(
    val status: String, // "ok"
    val message: String = ""
)
```

### /answer/update - POST
Изменение ответа. Ищет ответ по id и устанавливает значения из остальных полей

Принимает:
```kotlin
data class Answer(
    val id: Int,
    val questionId: Int,
    val userId: Int,
    val answer: String,
    val isBest: Boolean
)
```

Ответ:
```kotlin
data class Status(
    val status: String, // "ok"
    val message: String = ""
)
```

### /answer/delete/{id} - DELETE
Удаляет ответ.

Ответ:
```kotlin
data class Status(
    val status: String, // "ok"
    val message: String = ""
)
```

## Category

### /category/list - GET
Список категорий

Ничего не принимает

Ответ:
```kotlin
List<Category> // корневой элемент

data class Category(
    val id: Int,
    val name: String
)
```

## Subcategory

### /subcategory/forCategory/{categoryId} - GET
Список подкатегорий для категории

Ответ:
```kotlin
List<Subcategory> // корневой элемент

data class Subcategory(
    val id: Int,
    val categoryId: Int,
    val name: String
)
```



