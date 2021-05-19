export const requiredField = (value) =>{
    if (value) return undefined;
    else return 'Это обязательное поле';
}
export const maxLength = (value) =>{
    if (value && value.length > 64 ) return 'Слишком много символов!';
    else return undefined;
}
