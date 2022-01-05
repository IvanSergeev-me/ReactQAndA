import { QuestionsApi } from "./Api";



it("API should return correct data", ()=>{
    //Действие
    QuestionsApi.getQuestionsPage(1,1).then(response =>{
         //Ожидаение
        expect(response.data.length).toBeGreaterThan(0);
    })   
});