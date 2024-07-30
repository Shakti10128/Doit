import React from 'react'

import { BiTask } from "react-icons/bi";
import { IoStarOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";

import {Chart,Tooltip,Title,ArcElement,Legend} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'
import { useSelector } from 'react-redux';

Chart.register(
  Tooltip,Title,ArcElement,Legend
)

const Sidebar = ({isSidebar}) => {
  let pending = 0;
  let done  = 0;
  // getting all tasks from redux toolkit
  const tasks = useSelector((state)=> state.tasks.task);
  // finding pending and completed task
  tasks.forEach((task)=>{
    if(task.isCompleted === true) done+=1;
    else pending+=1;
  })
  // doughnut chart data for visualization
  const data = {
    labels: [
      'Pending',
      'Done'
    ],
    datasets: [{
      label: 'My Todos',
      data: [pending,done],
      backgroundColor: [
        "#3F9142",
        "#142E15"
      ],
    }]
  };




  return (
    <div className={`md:w-[35vw] absolute w-60 z-10 md:relative flex flex-col h-[calc(100vh-8vh)] ${isSidebar ? "md:-ml-[35vw] -ml-[60vw]":"ml-[0]"}
    transition-all
    `}>
       <div className='w-full flex md:items-center md:justify-center md:mt-16 h-full'>
          <div className='bg-[#EEf6EF] w-[80%] h-full'>
            {/* user profile */}
           <div className='md:-mt-14 flex items-center justify-center'>
            <img src="https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png" alt=""
            className='rounded-full w-28 h-28'
            />

            {/* user options */}
           </div>
            <div className='flex flex-col items-center gap-2 w-ful mt-10 bg-white rounded-md mx-5'>
              <div className='flex my-2 gap-2 font-medium items-center justify-start w-[60%] cursor-pointer'>
                <BiTask className='w-5 h-5'/> <span>All Tasks</span>
              </div>
              <div className='flex my-2 gap-2 font-medium items-center justify-start w-[60%] cursor-pointer'>
                <MdOutlineDateRange className='w-5 h-5'/> <span>Today</span>
              </div>
              <div className='flex my-2 gap-2 font-medium items-center justify-start w-[60%] cursor-pointer'>
                <IoStarOutline className='w-5 h-5'/> <span>Important</span>
              </div>
            </div>
            
            {/* chart */}
            <div className='w-full mt-10'>
              <div className='md:p-10'>
                <Doughnut data={data}/>
              </div>
            </div>

          </div>
       </div>
    </div>
  )
}

export default Sidebar