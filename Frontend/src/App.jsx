
import './App.css';
import Forms from './pages/userForms/forms';
import Home from './pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import UpdateForm from './pages/userForms/modifyUser';

function App() {

    return (
        <div className='box'>
            <Routes>
                <Route path='/' element={<Forms />} />
                <Route path='/home' element={<Home />} />
                <Route path='/update' element={<UpdateForm />} />
            </Routes>
        </div>
    )
}

export default App;
