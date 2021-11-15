import './App.css';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import DashboardMember from './screens/member/DashboardMember';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/member" element={<DashboardMember />} />
      </Routes>
    </div>
  );
}

export default App;
