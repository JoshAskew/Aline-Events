import { Outlet } from 'react-router-dom';
import { Provider } from "@/components/ui/provider"
import Footer from './components/Footer';
import Navbar from './components/Navbar';


function App() {

  return (
    <div className='container'>
        <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
