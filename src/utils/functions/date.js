export const dateConvert = (date) =>{
    if(date){
        const new_date = date?.split("-")?.reverse()?.join(".");
        return new_date;
    }
    return '';
}
