import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const PollList = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/poll/all')
      .then((res) => {
        setPolls(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch polls:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading polls...</p></div>;
 
  return (
    <div className="container mt-5">
      <h2>Available Polls</h2>
      {polls.length === 0 ? (
        <p>No polls found.</p>
      ) : (
        <ul className="list-group poll-results">
          {polls.map((poll) => (
            <li key={poll.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>{poll.question || poll.description}</div>
                <div>
                  <Link to={`/vote/${poll.id}`} className="btn btn-sm btn-primary me-2">
                    Vote
                  </Link>
                  <Link to={`/results/${poll.id}`} className="btn btn-sm btn-outline-secondary">
                    View Results
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PollList;
