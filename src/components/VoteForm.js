import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

const VoteForm = () => {
  const [poll, setPoll] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [message, setMessage] = useState('');
    const { id } = useParams();

  useEffect(() => {
    API.get(`poll/${id}`)
      .then(res => setPoll(res.data))
      .catch(err => console.error(err));
  }, []);

  const castVote = () => {
    if (!selectedOptionId) {
      setMessage('Please select an option first.');
      return;
    }

    API.post(`/poll/${id}/vote`, { optionId: selectedOptionId })
      .then(() => setMessage('Vote cast!'))
      .catch((err) => {
        console.log(err)
        setMessage('Vote failed.')});
  };

  if (!poll) return <p className='container'>Loading...</p>;

  return (
    // <div className='container  mt-5'>
    //   <h2>{poll.question}</h2>
    //   {poll.options.map(option => (
    //     <label key={option.id} style={{ display: 'block', margin: '8px 0' }}>
    //       <input
    //         type="radio"
    //         name="voteOption"
    //         value={option.id}
    //         checked={selectedOptionId === option.id}
    //         onChange={() => setSelectedOptionId(option.id)}
    //       />
    //       {option.name}
    //     </label>
    //   ))}
    //   <button className='submit button' onClick={castVote}>Vote</button>
    //   {message && <p>{message}</p>}
    // </div>

    <div className="container mt-5">
  <h2 className="mb-4">{poll.question}</h2>
  <form>
    {poll.options.map(option => (
      <div className="form-check" key={option.id}>
        <input
          className="form-check-input"
          type="radio"
          name="pollOption"
          value={option.id}
          checked={selectedOptionId === option.id}
          onChange={() => setSelectedOptionId(option.id)}
        />
        <label className="form-check-label">
          {option.name}
        </label>
      </div>
    ))}
    <button type="button" className="btn btn-primary mt-3" onClick={castVote}>
      Vote
    </button>
  </form>
  {message && <div className="alert alert-info mt-3">{message}</div>}
</div>

  );
};
// 

export default VoteForm;
