import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

function App() {
  const [isSidebar,setIsSidebar] = useState(false);

  return (
    <div>
     <div className='flex flex-col'>
      <Header setIsSidebar={setIsSidebar}/>
      <div className={`flex relative h-full`}>
        <Sidebar isSidebar={isSidebar}/>
        <Main/>
      </div>
     </div>
    </div>
  );
}

export default App;
