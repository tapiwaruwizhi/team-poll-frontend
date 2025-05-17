import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
// import useVoteSocket from '../hook/useVoteSocket';
// import { ProgressBar } from 'react-bootstrap';


const ViewResults = () => {
  const [poll, setPoll] = useState(null);
  const { id } = useParams();

    const fetchPoll = () => {
    API.get(`/poll/${id}`).then(res => setPoll(res.data));
  };

  useEffect(() => {
    fetchPoll();
  }, [id]);

    useEffect(() => {
    const socket = new WebSocket(`ws://localhost:3000/poll/ws/votes`);

    socket.onopen = () => console.log('🔌 Connected to vote updates');

    socket.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        // Match pollId as string (route params are strings)
        if (data.type === 'voteUpdate' && String(data.pollId) === String(id)) {
          console.log('📥 Vote update received for current poll:', data);
          fetchPoll(); // Refresh data
        }
      } catch (err) {
        console.error('❌ Failed to parse socket message:', err);
      }
    };

    socket.onerror = (e) => console.error('❌ WebSocket error:', e);
    socket.onclose = () => console.log('🔌 WebSocket closed');

    return () => {
      console.log('🔌 Closing WebSocket');
      socket.close();
    };
  }, [id]);


  if (!poll) return <p>Loading results...</p>;

  // const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

  // console.log(totalVotes)

  return (
    <div className='container'>
      <h2>{poll.question}</h2>
      <ul>
        {poll.options.map(opt => (
          <li key={opt.id}>
            {opt.name} — {opt.votes ?? 0} votes (s)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewResults;
