import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
