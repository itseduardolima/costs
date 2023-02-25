import { Outlet } from 'react-router-dom'
import Container from './components/layout/Container'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'


function App() {
  
  return (
    <div>
      <Navbar/>
      <Container customClass="min-height" >
        
        <Outlet/>
        
      </Container>
      <Footer/>
    </div>
    
  )
}

export default App; 