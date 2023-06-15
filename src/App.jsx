import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import PrivateRoute from './PrivateRoute';
import UserPage from './pages/User';
import VehiclePage from './pages/Vehicle';

function App() {
  return (     
    <Router>
      <Routes>
        <Route exact path="" element={<Login />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route element={<PrivateRoute/>}>
                <Route path="/users" element={<UserPage />} />
            </Route>        
        <Route element={<PrivateRoute/>}>
                <Route path="/vehicles" element={<VehiclePage />} />
            </Route>        
        <Route element={<NotFound />} />
        
      </Routes>
    </Router>
    
  );
}

export default App;
