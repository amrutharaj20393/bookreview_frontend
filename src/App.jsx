

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import AllBooks from './pages/AllBooks'
import Viewbook from './pages/Viewbook'
import Viewabook from './pages/Viewabook'
import Pagenotfound from './pages/Pagenotfound'
function App() {


  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/all-books' element={<AllBooks />} />
        <Route path='/review-book/:id' element={<Viewbook />} />
        <Route path='/view-book/:id' element={<Viewabook />} />

        <Route path='*' element={<Pagenotfound />} />
      </Routes>


    </>
  )
}

export default App
