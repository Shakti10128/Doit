import React from 'react'

import { IoMenu } from "react-icons/io5";


const Header = ({setIsSidebar}) => {
    // just changing the value of isSidbar to show or hide the sidebar
    const SidebarHandler = ()=>{
        setIsSidebar(prev=>!prev);
    }
  return (
    <div className='h-[8vh]'>
        <div className='flex items-center h-full justify-between'>
            <div className='flex gap-4 items-center ml-5 text-green-600'>
                <IoMenu onClick={SidebarHandler} className='cursor-pointer transition-all
                text-3xl
                '/>
                <h2 className='font-bold text-green-600 text-3xl'>DoIt</h2>
            </div>
            <div className='mr-5'>
            </div>
        </div>
    </div>
  )
}

export default Header