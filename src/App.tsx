import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateLayout from './layouts/PrivateLayout';
import Habits from './pages/Habits/Habits';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/habits"></Navigate>}/> 
            <Route path="/login" element={<Login></Login>}  />
            <Route path="/signup" element={<Signup></Signup>}  />
            <Route element={<PrivateLayout></PrivateLayout>}>
              <Route path="/habits" element={<Habits></Habits>}  />
            </Route>
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
