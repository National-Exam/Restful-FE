import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import PrivateRoute from './PrivateRoute';

function App() {
  return (     
    <Router>
      <Routes>
        <Route exact path="" element={<Login />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route element={<PrivateRoute/>}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>        
        <Route element={<NotFound />} />
        
      </Routes>
    </Router>
    
  );
}

export default App;
