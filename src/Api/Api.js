import axios from 'axios';

const instance = axios.create({
    withCredentials:true,
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
export const AnswersApi = {
    postAnswerForQuestion(questionId, userId, answer){
        return instance.post(`answer/create`, {id:1, questionId, userId, answer, isBest:false});
    },
    updateAnswer(id,questionId, userId, answer){
        return instance.post(`answer/update`, {id, questionId, userId, answer, isBest:false});
    },
    deleteAnswer(id){
        return instance.delete(`answer/delete/${id}`);
    },
    setBestAnswer(id){
        return instance.post(`/answer/setBest/${id}`)
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
        return instance.delete(`/user/signout`);
    },
    registerNewUser(login, password, rememberMe=false){
        return instance.post(`/user/register`, {id: 0, login, password, image:""});
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
export const ChangeUserApi = {
    changeUser(id, login, password, image){
        return instance.post(`user/update`, {id, login, password,image})
    }
}
