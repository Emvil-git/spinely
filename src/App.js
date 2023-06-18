import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './routes/Dashboard';
import History from './routes/History';
import Settings from './routes/Settings';
import SignUp from './routes/SignUp';
import { AppContextProvider } from './context/AppContext';

function App() {
  return (
    <AppContextProvider>
      <Router>
      <div className="App d-flex ">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/history' element={<History/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/login' element={<SignUp/>}/>
        </Routes>
      </div>
    </Router>
    </AppContextProvider>
  );
}

export default App;
