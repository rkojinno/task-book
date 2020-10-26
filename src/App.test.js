import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import {setToLocalStorage,checkIfDataValid} from './assets/js/functions' ;



// 1 - Render Texts
// 2 - Local Storage Funcions



// 1 - Render Texts ....................................................................................................................................
test('Renders nav button - home', () => {
    const { getByTestId } = render(<App />);
  expect(getByTestId('home-nav-button') ).toHaveAttribute('id','home-nav')
});

test('Renders nav button - history', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('history-nav-button') ).toHaveAttribute('id','history-nav')
});

test('Check on home description', () => {
    const { getByText } = render(<App />);
    const homeDescription = getByText('Welcome, use this form to add a new task.');
    expect(homeDescription).toBeInTheDocument();
});



// 2 - Local Storage Funcions .....................................................................................................................................

// checkIfDataValid

let mockTask1 = [{"name":"mock task 1 ","description":"","status":"open","id":0},{"name":"mock task 2 ","description":"has description","status":"open","id":1}];
let mockTask2 = [{"name":"","description":"","status":"open","id":0},{"name":"mock task 2 ","description":"has description","status":"open","id":1}];

test(`Checking for data valid state of: ${JSON.stringify(mockTask1)} `, () => {
    let dataCheck =  checkIfDataValid(mockTask1)
    expect(dataCheck.isValid).toBe(true);
});

test(`Checking for description saved of #[0] in : ${JSON.stringify(mockTask1)} `, () => {
    let dataCheck =  checkIfDataValid(mockTask1)
    let description = dataCheck.array[0].description;
    expect(description).toBe('no description');
});
test(`Checking for description  saved of #[1] in : ${JSON.stringify(mockTask1)} `, () => {
    let dataCheck =  checkIfDataValid(mockTask1)
    let description = dataCheck.array[1].description;
    expect(description).toBe('has description');
});

test(`Checking for data valid state of: ${JSON.stringify(mockTask2)} `, () => {
    let dataCheck =  checkIfDataValid(mockTask2)
    expect(dataCheck.isValid).toBe(false);
});




class localStorageMock {
    constructor() {
      this.store = {};
    }
    clear() {
      this.store = {};
    }
    getItem(key) {
      return this.store[key] || null;
    }
    setItem(key, value) {
      this.store[key] = value.toString();
    }
    removeItem(key) {
      delete this.store[key];
    }
};
global.localStorage = localStorageMock;

const testStorageName = 'testStorageList';
const taskListDataTest = localStorage.getItem(testStorageName);

if(taskListDataTest != null){
    localStorage.removeItem(testStorageName);
    checkForLocalStorageUpdate();
}else{
    checkForLocalStorageUpdate();
}


function checkForLocalStorageUpdate(){
    let currentDate = new Date();
    let minute = currentDate.getMinutes()
    let day = currentDate.getDay()
        let testMockData = {name: `mockData${day}${minute}`, description: 'this is a mockData test'}
        setToLocalStorage(testStorageName, JSON.stringify(testMockData));
    
        test(`Updating storage in week day ${day} and minutes ${minute} `, () => {
                let newTaskListDataTest = localStorage.getItem(testStorageName);
                let parsedUpdatedDate = JSON.parse(newTaskListDataTest);
                expect(parsedUpdatedDate.name).toBe(`mockData${day}${minute}`);  
        });
     
}





