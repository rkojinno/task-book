import React,{useState} from 'react';

const useValue = valueSet => {
    const [value,updateValue] = useState(valueSet);
    return {
        value, 
        onChange: e => updateValue(e.target.value)
    }
}



export default ({task,editTask,cancelEditTask}) => {

    const taskName = useValue(task.name);
    const taskDescription = useValue(task.description);
    
    const callEditTask = () => {

        let taskObj = task;
        taskObj.name = taskName.value;
        taskObj.description = taskDescription.value;

        editTask(taskObj);
    }

    const callCancelEditTask = () => {
        cancelEditTask()
    }
    


    return (
        <div className={'full-modal'}>
            <div className={'inner'}>
            <p>Editing task [ {task.id} ], keep in mind that the a task name is mandatory.</p>
            <div className={'block-div input-block'}>
                <label className={'block-div'}>Task Name:</label>
                <input {...taskName}/>
                <p className={'font_s'}>
                    Previous: {task.name}
                </p>
            </div>
            <div className={'block-div input-block'}>
                <label className={'block-div'}>Description</label>
                <input {...taskDescription}/>
                <p className={'font_s'}>
                    Previous: {task.description}
                </p>
            </div>
            <div className={'block-div '}>
                <div className={'text-right'}>
                    <button className={'btn-cancel'}  onClick={ () => callCancelEditTask() }> Cancel </button>
                    <button className={'btn-confirm'} onClick={ () => callEditTask() }> Save Task </button>
                </div>
            </div>
           

           

        

           </div>

        </div>
    )

}