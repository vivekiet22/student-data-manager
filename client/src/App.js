import Login from "./components/Login";
import Signup from "./components/Signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  BrowserRouter,
} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import StudentState from './context/students/StudentState'
function App() {
  return (
    <>
    <StudentState>

    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    
    <Route path="/dashboard" element={<Dashboard />} />
          
      {/* <Signup /> */}
      {/* <Login /> */}
    </Routes>
    </BrowserRouter>
    </StudentState>
    </>
  );
}

export default App;
