import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import PrivateRoute from './PrivateRoute';
import EmployeePage from './pages/Employee';

function App() {
  return (     
    <Router>
      <Routes>
        <Route exact path="" element={<Login />} />
        <Route exact path="/register" element={<SignUp />} />             
        <Route element={<PrivateRoute/>}>
                <Route path="/employees" element={<EmployeePage />} />
            </Route>        
        <Route element={<NotFound />} />
        
      </Routes>
    </Router>
    
  );
}

export default App;
