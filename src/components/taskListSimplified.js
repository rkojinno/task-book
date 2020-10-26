import React from 'react';



export default ({taskArray,status,onSetItemStatus,onSetItemToEdit}) => {


    return (
        <div className={'task-container'}> 

    { taskArray.map(function(task, index){
        if( (task.status === status) || status == ''){

            return (
                <div key={task.id} className={'task-block-simple'}> 
                   <h4 className={'flex-div between'}>
                       <span>
                            {task.name} <span className={`sts-block-${task.status}`}>{task.status}</span>
                       </span>
                       <span>
                            id:{task.id}
                       </span>
                      
                    </h4>
                   <p className={'description-block'}>{task.description}</p>
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