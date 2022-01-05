import askReducer, { askQuestionThunk, clearState, toggleFetchingAC } from "../Reducers/ask-reducer";
import React from "react";



it("clear should be correct", ()=>{
    //Данные, на которых проводится тестирование
    let state = {
        message:"Error",
        categories:[{id:0, title:"Легковые автомобили"}],
        subCategoriesForCategory:[{id:0, title:"АвтоВаз"},{id:1, title:"БМВ"}],
        selectedCategory:{id:0, title:"Легковые автомобили"},
        selectedSubCategory:{id:0, title:"АвтоВаз"},    
    };
    //Действие
    let action = clearState();
    let exepectedState = askReducer(state, action);
    //Ожидание
    expect(exepectedState.message.length).toBe(0);
    expect(exepectedState.categories.length).toBe(0);
    expect(exepectedState.subCategoriesForCategory.length).toBe(0);
    expect(exepectedState.selectedCategory).toMatchObject({});
    expect(exepectedState.selectedSubCategory).toMatchObject({}); 
});
it("toggle fetching must give opposite varriable", ()=>{
    //Данные, на которых проводится тестирование
    let state = {
        message:"",
        categories:[],
        subCategoriesForCategory:[],
        selectedCategory:{},
        selectedSubCategory:{},
        isFetching:false,
    };
    //Действие
    let action = toggleFetchingAC();
    let exepectedState = askReducer(state, action);
    //Ожидание
    expect(exepectedState.isFetching).toBe(true);
    //Повтор действия
    state.isFetching = true;
    exepectedState = askReducer(state, action);
    //Ожидаение
    expect(exepectedState.isFetching).toBe(false);
});

