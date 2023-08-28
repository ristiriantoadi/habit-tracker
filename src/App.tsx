import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateLayout from './layouts/PrivateLayout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/login" element={<Login></Login>}  />
              <Route path="/signup" element={<Signup></Signup>}  />
            </Route>
            <Route element={<PrivateLayout></PrivateLayout>}>
              <Route path="/" element={<Home></Home>}  />
            </Route>
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
