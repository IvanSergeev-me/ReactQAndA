import axios from 'axios';

const instance = axios.create({
    withCredentials:true,
    //headers:{"API-KEY":"9bfe0302-3819-4ebf-8b85-d5ed5fcf098a"},
    baseURL:"http://localhost:8080/"
});


export const QuestionsApi = {
    getQuestionsPage(currentPage,pageSize){
        return instance.get(`question/all`);
        //must be like: return instance.get(`question/all?page=${currentPage}&count=${pageSize}`)
    },
    getQuestionsForSubcategory(id){
        return instance.get(`question/forSubcategory/${id}`);
    },
    getCurrentQuestion(id){
        return instance.get(`question/info/${id}`);
    },
    
};
export const ActionsApi = {
    postAnswerForQuestion(questionId, userId, answer){
        return instance.post(`answer/create`, {id:1, questionId, userId, answer, isAnswerGiven:false});
    }
}
export const AskQuestionApi = {
    getCategories(){
        return instance.get(`category/list`);
    },
    getSubcategories(id){
        return instance.get(`subcategory/forCategory/${id}`);
    },
    askQuestion(subcategoryId, userId, title, description){
        return instance.post(`question/create`, {id:1, subcategoryId, userId, title, description});
    }

};
export const AuthorisationApi = {
    /*loginExists(login, password){
        return instance.get(`user/exists/${login}/${password}`);
    },*/
    //Если нет - ответ 0, Если да - то возвращается id пользователя
    loginMe(login, password, rememberMe=false){
        return instance.post(`user/auth`, {id:0,login, password, image:""});
    },
    logoutMe(){
        return instance.delete(``);
    }
};
export const ProfileApi = {
    getMyQuestions(id){
        return instance.get(`question/forUser/${id}`);
    },
    deleteMyQuestion(id){
        return instance.delete(`question/delete/${id}`)
    }
}
