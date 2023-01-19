import './App.css';
import SignupPage from './context/SignupPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './context/LoginPage';
import UserHome from './context/UserHome';
import PrivateRoute from './components/PrivateRoutes';
import Header from './components/Header';
import Profile from './pages/Profile';
import Points from './pages/Points';
import Task from './pages/Task';
import Home from './pages/Home';
import AdminHome from './pages/AdminHome';
import AdminHomepage from './pages/AdminHomepage';
import Addapps from './pages/Addapps';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Routes>
          <Route path="/userhome" exact element={ <PrivateRoute> <UserHome /> </PrivateRoute>}>
       

            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="points" element={<Points />} />
            <Route path="task" element={<Task />} />
    
          </Route>

          <Route path="/adminhome" exact element={ <PrivateRoute> <AdminHome /> </PrivateRoute>}>
       

       <Route path="home" element={<AdminHomepage />} />
       <Route path="add" element={<Addapps />} />

       
       </Route>

          <Route element={<LoginPage />} path='/' />
          <Route element={<SignupPage />} path='/signup' />

        </Routes>


      </AuthProvider>



    </BrowserRouter>
  );
}

export default App;
