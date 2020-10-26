import React, {useState, useEffect} from 'react';

const useValue = valueSet => {
    const [value,updateValue] = useState(valueSet);
    return {
        value,
        onChange: e => updateValue(e.target.value),
    }
}





export default ({onSaveTask,refreshInput}) => {
    const taskName = useValue('');
    const taskDescription = useValue('');
   

    const saveTask = () => {
        let taskObj = {
            name: taskName.value,
            description: taskDescription.value,
        }
        onSaveTask(taskObj);
    }

    useEffect(() => {
        if(taskName.value != ''){
            let clear = {target: {value: ''}}
            taskName.onChange(clear);
            taskDescription.onChange(clear);
        }
    }, [refreshInput]);
    
    

    return (
        <div className={'modal-md1'}>
            <p>Welcome, use this form to add a new task.</p>


            <div className={'flex-div'}>

         
            
           
            <div className={'input-block flex-g1'}>
                <label className={'block-el'}>Task Name:</label>
                 <input {...taskName}/>
            </div>
            

            <div className={'input-block flex-g1'}>
                <label className={'block-el'}>Description</label>
                <input {...taskDescription} />
            </div>


            </div>
            
            <div className={'input-block flex-g1 text-right'}>
            <button onClick={() => saveTask()} className={'btn-confirm'}> Save </button>
            </div>    

            
        </div>
    )

}