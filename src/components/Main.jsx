import React from 'react'
import CreateTask from './CreateTask'
import TasksList from './TasksList'

const Main = () => {
  return (
    <div className='w-full relative h-full'>
        <CreateTask/>
        <TasksList/>
    </div>
  )
}

export default Main