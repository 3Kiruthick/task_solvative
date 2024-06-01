import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home, New_User, User_Data, Transaction, Reward } from './Pages';

function App() {
  return (
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/new' element={<New_User />} />
      <Route path='/:id' element={<User_Data />} />
      <Route path='/transaction' element={<Transaction />} />
      <Route path='/reward' element={<Reward />} />
    </Routes>
  );
}

export default App;
