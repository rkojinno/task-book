import React from 'react';



export default ({taskArray,onSetItemStatus,onSetItemToEdit}) => {

    return (
        <div className={'task-container'}>

    


    {taskArray.map(function(task, index){
        if(task.status === 'open'){

            return (
                <div className={'task-block'} key={task.id}> 
                   <h2 className={'flex-div between'}>
                       <span className={'task-name open'}>{task.name} </span>
                        <span className={'task-id'}>id:{task.id}</span>
                    </h2>
                   <p>{task.description}</p>
                   {task.status === 'open' &&
                   <div className={'block-div text-right'}>
                        <button className={'btn-confirm'} onClick={() => onSetItemStatus(task.id, 'done')}> Complete</button>
                        <button className={'btn-cancel'} onClick={() => onSetItemStatus(task.id, 'cancelled')}> Cancel</button>
                        <button className={'btn-modal'} onClick={() => onSetItemToEdit(task)}> Edit</button>
                   </div>
                    }
                   {task.updatedAt &&
                     <div className={'block-div text-right mt10'}>
                        <p className={'font_s'}>
                            updated at: {task.updatedAt}
                        </p>
                      </div>  
                   } 
               
               </div>
            )   
        }else{
            return false;
        }
         
       })}

        </div>
    )

}