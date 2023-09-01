import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateLayout from './layouts/PrivateLayout';
import CreateEdit from './pages/CreateEdit/CreateEdit';
import Habits from './pages/Habits/Habits';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Signup from './pages/Signup/Signup';

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/habits"></Navigate>}/> 
            <Route path="/login" element={<Login></Login>}  />
            <Route path="/signup" element={<Signup></Signup>}  />
            <Route path="*" element={<NotFound></NotFound>}></Route>
            <Route element={<PrivateLayout></PrivateLayout>}>
              <Route path="/habits">
                <Route index element={<Habits></Habits>}></Route>
                <Route path='create' element={<CreateEdit title="Create Habit"></CreateEdit>}/>
                <Route path='edit/:idHabit' element={<CreateEdit title="Edit Habit"></CreateEdit>}/>
              </Route>
              <Route path="*" element={<NotFound></NotFound>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
