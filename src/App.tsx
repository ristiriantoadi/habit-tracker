import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateLayout from './layouts/PrivateLayout';
import Create from './pages/Create/Create';
import Edit from './pages/Edit/Edit';
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
                <Route path='create' element={<Create></Create>}/>
                <Route path='edit/:idHabit' element={<Edit/>}/>
              </Route>
              <Route path="*" element={<NotFound></NotFound>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
