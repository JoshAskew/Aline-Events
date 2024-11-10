import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

function App() {

  return (
    <div className='container'>

      <main className='dark'>
      
        <Outlet  />
   
      </main>

      <Footer />
    
    </div>
  )
}

export default App
