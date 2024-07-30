import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { deleteTask, markComplete, updateTask} from '../slices/addTaskSlice';
import toast from 'react-hot-toast';

const TasksList = () => {
    // to show and hide the popup
    const [isUpdated,setIsUpdated] = useState(false);
    // to keep track the reference of input value
    const [taskValue,setTaskValue] = useState("");
    // to keep track the whole task object, that has to be updated
    const [updatedTask,setUpdatedTask] = useState({});

    // getting the all task to list down
    const tasks = useSelector((state) => state.tasks.task);
    // dispatch is kind of bridge between react-redux & redux-toolkit for communication
    const dispatch = useDispatch();
    
    // mark the task complete via this handler
    const markCompleteTaskHandler = (task)=>{
        dispatch(markComplete(task?.id));
        toast.success("Success");
    }

    // delete the task via this handler
    const deleteTaskHandler = (task)=>{
        dispatch(deleteTask(task.id));
        toast.success("Task Deleted")
    }

    // open the popUp to update the task
    const openUpdateTaskPopUp = (task)=>{
        // toogle the value to show the popUp for updating the task
        setIsUpdated(prev=>!prev);
        // we need the full object to update
        setUpdatedTask(task);
        // set the title in input bar, so that user can see what he's going to update
        setTaskValue(task?.title);
    }

    const updateTaskHandler = ()=>{
        // the task value should be > 0
        if(taskValue.length > 0) {
            // taking copying of updated object
            var task = updatedTask;
            // only modifying thr value that going to be update
            task = {
                ...task,
                title:taskValue
            }
            // trigger the action for updating the task
            dispatch(updateTask(task));
            // make sure to hide the popUp
            setIsUpdated(prev=>!prev);
            // notify the user
            toast.success("Task Updated");
        }
        else if(taskValue.length === 0){
            toast.error("Task is empty")
        }
    }

  return (
    <div className='flex flex-col gap-4 relative'>
        {
            // showing all tasks that are not completed
            tasks.map((task)=>{
                return task?.isCompleted === false && <div className='h-16 border-t-2 border-b-2 flex items-center justify-between' key={task?.id}>
                        <div className='flex gap-3 items-center text-center pl-4'>
                            <input type="checkbox" className={`w-4 h-4 ${task?.isCompleted && "peer-checked:bg-green-600"}`} checked={task?.isCompleted} onClick={()=> markCompleteTaskHandler(task)}/>
                            <h3>{task?.title}</h3>
                        </div>
                        <div className='flex gap-2 text-xl pr-6'>
                            <FaRegEdit className='text-green-700 cursor-pointer'
                            onClick={()=>openUpdateTaskPopUp(task)}
                            />
                            <MdDeleteOutline className='text-green-700 cursor-pointer'
                            onClick={()=>deleteTaskHandler(task)}
                            />
                        </div>
                 </div>
            })
        }

        {/* showing all tasks that are completed*/}
        <div>
            <h1 className='my-5 ml-4'>Completed</h1>
            <div>
                    {
                    tasks.map((task)=>{
                        return task?.isCompleted === true &&  <div className='h-16 border-t-2 border-b-2 flex items-center justify-between' key={task?.id}>
                                <div className='flex gap-6 items-center justify-center pl-4'>
                                    <input type="checkbox" className='w-4 h-4' checked={task?.isCompleted} onClick={()=> markCompleteTaskHandler(task)}/>
                                    <h3 className='line-through'>{task?.title}</h3>
                                </div>
                                <div className='flex gap-2 text-xl pr-6'>
                                    <FaRegEdit className='text-green-700 cursor-pointer'
                                    onClick={()=>openUpdateTaskPopUp(task)}
                                    />
                                    <MdDeleteOutline className='text-green-700 cursor-pointer'
                                    onClick={()=>deleteTaskHandler(task)}
                                    />
                                </div>
                        </div>
                    })
                }
            </div>
        </div>

        {/* update Task popup */}
        <div className={`flex flex-col self-center mx-auto gap-4 absolute md:w-[60%] z-10 bg-[#d8ebda] h-52 ${isUpdated ? "block opacity-100": ""} bottom-0 -top-32 opacity-0 rounded-md transition-all w-full`}>
            <div className='flex items-center justify-center mt-12'>
                <input type="text" value={taskValue} className='px-2 py-4 w-[90%] rounded-md
                focus:outline-none
                '
                onChange={(e)=>setTaskValue(e.target.value)}
                />
            </div>
            <div className='flex gap-4 items-center justify-end mr-14'>
                <button className='font-bold bg-[#b4cab4] text-[#357937] px-4 py-1 rounded-md'
                onClick={()=>setIsUpdated(false)}
                >Cancel</button>
                <button className='font-bold bg-[#b4cab4] text-[#357937] px-4 py-1 rounded-md'
                onClick={updateTaskHandler}
                >Update Task</button>
            </div>
        </div>
    </div>
  )
}

export default TasksList