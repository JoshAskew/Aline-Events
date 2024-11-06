import { Outlet } from 'react-router-dom';


function App() {

  return (
    <div className='container'>

        <Navbar />

      <main>
      
        <Outlet />
   
      </main>
    
    </div>
  )
}

export default App
