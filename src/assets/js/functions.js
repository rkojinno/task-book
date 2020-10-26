export function setToLocalStorage(name,data){
    if(data){
        localStorage.setItem(name, data)
    }else{
        alert('Error updating your data, please try again')
        window.location.reload(); 
    }
}

export function checkIfDataValid(array){
    let arrayData = array;
    let dataValid = true;

    arrayData.forEach( 
        (item) => {
            if(!item.name || item.name == ''){
                dataValid = false;
            }
            if(!item.description || item.description == ''){
                item.description = 'no description'
            }
        }
    )

    return {isValid: dataValid, array: arrayData}

}