import React, {useEffect,useState} from 'react';
import '../../assets/style/style.scss'

// Funcitions
import {useFullHistoryContext} from '../../contextStore/fullHistoryStore'
import { setToLocalStorage,checkIfDataValid } from '../../assets/js/functions';

//Components
import RegisterTask from '../../components/registerForm.js';
import TaskList from '../../components/taskListMain.js'
import EditModal from '../../components/taskEditModal'

export default () => {

  const {
    fullHistory,
    setFullHistory
  } = useFullHistoryContext();

  const [selectedTaskEdit,setSelectedTaskEdit] = useState(false);
  const [refreshRegisterInput, callRefreshRegisterInput] = useState(true);
  


    useEffect(() => {
      let localStorageList = localStorage.getItem('taskList');
      if(localStorageList != null){
        localStorageList = JSON.parse(localStorageList)
      }else{
        localStorageList = [];
      }
      setFullHistory(localStorageList)
      setFullHistory(localStorageList)
      
    }, [])
 


  const saveTask = (taskData) => {

  
    let newTaskList = [...fullHistory];
 
    let newTaskData = taskData;
    newTaskData.status = 'open';


    if(newTaskList.length === 0){
      newTaskData.id = 0;
    }else{
      newTaskData.id = parseInt(localStorage.getItem('lastId')) + 1
    }

    newTaskList.push(taskData)
   

    let checkValue = checkIfDataValid(newTaskList);
   
    if(checkValue.isValid){
      
  
      
      updateLocalStorageArray('taskList',newTaskList)
      localStorage.setItem('lastId',newTaskData.id);

      callRefreshRegisterInput(n => n + 1)


      return setFullHistory(newTaskList)
    }else{
      alert('Error: To update your taks list, tasks require a name.')
    }


  }


  const setItemStatus = (id,status) =>{
    let newTaskList = [...fullHistory];
    let selectedItem = newTaskList.findIndex(task => task.id === id);
    newTaskList[selectedItem].status = status;

    let d = new Date();
    let dd = d.getDate();
    let dm = ( (d.getMonth() ) + 1)
    let dy = d.getFullYear();

    newTaskList[selectedItem].updatedAt = `${dy}/${dm}/${dd}`; 


    updateLocalStorageArray('taskList',newTaskList)

    return setFullHistory(newTaskList)
  }

  const updateLocalStorageArray = (name,value) => {
      alert('Task List updated')
      setFullHistory(
        setToLocalStorage(name, JSON.stringify(value))
      )
  }

  const setItemToEdit = (task) =>{
    setSelectedTaskEdit(task)
  }

  const cancelEditTask = () => {
    setSelectedTaskEdit(false)
  }
  
  const editTask = (editTask) => {
    let newTaskList = [...fullHistory];
    let selectedItem = newTaskList.findIndex(task => task.id === editTask.id);
    newTaskList[selectedItem] = editTask;

    let d = new Date();
    let dd = d.getDate();
    let dm = ( (d.getMonth() ) + 1)
    let dy = d.getFullYear();

    newTaskList[selectedItem].updatedAt = `${dy}/${dm}/${dd}`; 


    let checkValue = checkIfDataValid(newTaskList);

    if(checkValue.isValid){
      updateLocalStorageArray('taskList',checkValue.array)
      cancelEditTask();

      return setFullHistory(checkValue.array)

    }else{
      alert('Error: To update your taks list, tasks require a name.')
    }

  }

  const checkForOpenTasks = () =>{
    let hasOpenTasks = false;
    
    
    if(fullHistory && fullHistory.length > 0){

            let fullHistoryCopy = [...fullHistory];
          fullHistoryCopy.forEach( 
            (item) => {
              if(item.status == 'open'){
                hasOpenTasks = true;
              }
            }
          )

    }


    return hasOpenTasks;


  }


  


  return (



      <div className="main-view view-section">

        {selectedTaskEdit &&
          <EditModal task={selectedTaskEdit}  cancelEditTask={() => {cancelEditTask()}} editTask={(task) => {editTask(task)}}></EditModal> 
        }
     
      <RegisterTask 
        refreshInput={refreshRegisterInput}
        onSaveTask={(taskData) => {saveTask(taskData)}}>
      </RegisterTask>
      

      <div className={'task-block'}>
        <h1 className={'open'}>Open Tasks </h1>
      </div>
      

      { (fullHistory && fullHistory.length > 0 )&&
         <TaskList taskArray={fullHistory}
         onSetItemToEdit={(task) => {setItemToEdit(task)}}
         onSetItemStatus={(id,status) => {setItemStatus(id,status)} }
       ></TaskList> 
      }

      
      {  !checkForOpenTasks() &&
        <p>No Task Available</p>
      }
     


      </div>




  )
}


