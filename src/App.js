import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePoll from './components/CreateNewPoll';
import VoteForm from './components/VoteForm';
import ViewResults from './components/ViewVoteResults';
import PollList from './components/PollList';
import './App.css'

const App = () => {

  
  const getAnonToken = async () => {
  const response = await fetch('http://localhost:3000/auth/anon');
  const data = await response.json();
  localStorage.setItem('anonToken', data.token);
};

useEffect(() => {
  getAnonToken();
}, []);
  return (
    <Router>
      <nav className='container mt-5'>
        <ul className='poll-results' >
          <li><Link className="btn btn-sm btn-primary me-2" to="/create">Create New Poll</Link></li>
          {/* <li><Link to="/vote">Vote</Link></li> */}
          <li><Link className="btn btn-sm btn-primary me-2" to="/polls">View Polls</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/vote/:id" element={<VoteForm />} />
        <Route path="/results/:id" element={<ViewResults />} />
        <Route path="/polls" element={<PollList />} />
      </Routes>
    </Router>
  );
};

export default App;
