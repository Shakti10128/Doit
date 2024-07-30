import React, { useState } from 'react'

import { BsBell } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { useDispatch} from 'react-redux';
import { addTask } from '../slices/addTaskSlice';
import toast from 'react-hot-toast';

const CreateTask = () => {
    // task state for taking the reference of input value
    const [Task,setTask] = useState("");

    // to triger an action
    const dispatch = useDispatch();

    // add the task via this handler
    const addTaskHandler = (e)=>{
        e.preventDefault();
        // if task lenght === 0,means input field is empty
        if(Task.length > 0) {
            // is there is a task
            const task = {
                title:Task,
                // to manage that user has completed this task or not
                isCompleted:false,
                // to uniquely identifu a task in tasks array to perform some operations
                id:crypto.randomUUID()
            }
            // triggering action to add the task in tasks array
            dispatch(addTask(task));
            // make sure input should be empty after adding the task
            setTask("");
            // notify user that task has been added
            toast.success("Task Added");
            return;
        }
        else{
            // if input field is empty than, don't need to add empty task just notify the user
            toast.error("Task is empty")
        }
    }
  return (
    <div>
        <form onSubmit={addTaskHandler} className='flex flex-col justify-between py-2 gap-2 bg-[#EEf6EF] h-44 px-5'>
           <div className='mt-10'>
                <input type="text" placeholder='Add A Task' className='bg-[#EEf6EF] w-full px-2 py-4 border-b-2 focus:outline-none'
                value={Task}
                // whenever value will be changed, we will having the reference
                onChange={(e)=> setTask(e.target.value)}
                />
           </div>
           <div className='flex items-center justify-between'>
            <div className='flex gap-4'>
                <BsBell className='text-2xl'/>
                <CiCalendarDate className='text-2xl'/>
            </div>
            <div className='font-bold bg-[#b4cab4] text-[#357937] px-4 py-1 rounded-md'>
                {/* when the add task button will clicked, then we will triggered the add task handler */}
                <button onClick={()=>addTaskHandler} className='cursor-pointer'>
                  ADD TASK
                </button>
            </div>
           </div>
        </form>
    </div>
  )
}

export default CreateTask