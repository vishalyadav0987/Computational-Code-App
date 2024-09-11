import React from 'react'
import Home from './Pages/Home/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import Explore from './Pages/Explore/Explore'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import { Box, Divider } from '@chakra-ui/react'
import AllProjectList from './Pages/AllProjects/AllProjectList'
import ContentPage from './Pages/ContentPage/ContentPage'
import ProblemHomePage from './Pages/ProbleHomePage/ProblemHomePage'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import CompanyAskedPage from './Pages/Company/CompanyAskedPage'
import UserProfile from './Pages/UserProfile/UserProfile'
import UpdateProfile from './Pages/UpdateProfilePage/UpdateProfile'
import TopicWiseProblem from './Pages/TopicWiseProblem/TopicWiseProblem'
import LoveDSASheet from './Pages/LoveDSASheet/LoveDSASheet'

const App = () => {
  const location = useLocation()
  const hideNavAndFooter = location.pathname.startsWith('/problem/description/');
  return (
    <>

      {!hideNavAndFooter && <Navbar />}
      <Divider></Divider>
      <Box style={{ minHeight: "calc(100vh - 130px)" }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/explore/developer-space' element={<Explore />} />
          <Route path='/user/all/projects' element={<AllProjectList />} />
          <Route path='/problem/description/:name' element={<ContentPage />} />
          <Route path='/all/problemset' element={<ProblemHomePage />} />
          <Route path='/asked-question/company' element={<CompanyAskedPage />} />
          <Route path='/user/:username' element={<UserProfile />} />
          <Route path='/user/update-profile/:username' element={<UpdateProfile />} />
          <Route path='/topic-related/dsa-sheet' element={<TopicWiseProblem />} />
          <Route path='/interview/dsa-sheet/l' element={<LoveDSASheet />} />
        </Routes>
      </Box>
      {!hideNavAndFooter && <Footer />}

    </>
  )
}

export default App
