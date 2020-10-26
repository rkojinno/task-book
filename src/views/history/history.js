import React,{useState} from 'react';
import '../../assets/style/style.scss'

// Funcitions
import {useFullHistoryContext} from '../../contextStore/fullHistoryStore'
import { setToLocalStorage,checkIfDataValid } from '../../assets/js/functions';

//Components
import TaskListSimplified from '../../components/taskListSimplified'
import EditModal from '../../components/taskEditModal'



export default () => {

  const {fullHistory,setFullHistory} = useFullHistoryContext();
  const [statusFilter, setStatusFilter] = useState('');

  const [selectedTaskEdit,setSelectedTaskEdit] = useState(false);
  

  const statusList = ['open','done','cancelled']
  



  const countByStatus = (taskArray,status) => {
    if(Array.isArray(taskArray)){

    const filteredArray = taskArray.filter(item => item.status == status);
    return filteredArray.length;

    }else{
      return 0
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

  const getArraySorted = (array,filterStatus) => {
    let returnArray = [...array];
    if(filterStatus == 'open'){
      returnArray = returnArray.reverse()
    }
    return returnArray;


  }

 


  return (
    <div className="history-view view-section">


      {selectedTaskEdit &&
          <EditModal task={selectedTaskEdit}  cancelEditTask={() => {cancelEditTask()}} editTask={(task) => {editTask(task)}}></EditModal> 
        }
       
      <div>
      <button className={ statusFilter == '' ? 'btn-filter-active' : 'btn-filter'} onClick={() => {setStatusFilter('')}}> All ( {fullHistory.length} ) </button>
      {statusList.map(function(status){
        return (
        <button className={ statusFilter == status ? 'btn-filter-active' : 'btn-filter'} onClick={() => {setStatusFilter(status)}}> <span>{status}</span> ( {countByStatus(fullHistory,status)} ) </button>
        )
      })
      }
    
      </div>


      {fullHistory.length > 0 &&
        <TaskListSimplified taskArray={ getArraySorted(fullHistory,statusFilter)} status={statusFilter} onSetItemStatus={(id,status) => {setItemStatus(id,status)} }
        onSetItemToEdit={(task) => {setItemToEdit(task)}}
        ></TaskListSimplified>
      }
      {fullHistory.length === 0 &&
        <p>No data</p>
      }
      
  

    </div>
  );
}


