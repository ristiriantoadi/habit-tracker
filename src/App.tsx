import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateLayout from './layouts/PrivateLayout';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout></PublicLayout>}>
            <Route path="/login" element={<Login></Login>}  />
            <Route path="/signup" element={<Signup></Signup>}  />
          </Route>
          <Route element={<PrivateLayout></PrivateLayout>}>
            <Route path="/" element={<Home></Home>}  />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
