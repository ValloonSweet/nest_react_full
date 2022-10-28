import './App.css';
import Nav from './components/Nav';
import { Menu } from './components/Menu';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Wrapper from './components/Wrapper';

function App() {

  const router = createBrowserRouter([
    {path: '/', element: <Dashboard />},
    {path: '/users', element: <Users />}
  ])

  return (
    <div className="App">
      <Wrapper>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/users' element={<Users />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Wrapper>
    </div>
  );
}

export default App;
