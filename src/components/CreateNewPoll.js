import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import API from '../api';

const CreatePoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ name: '', description: '' }]);
  const [expiresAt, setEndDate] = useState(new Date());
  const [message, setMessage] = useState('');
  const handleChange = (index, field, value) => {
    const updated = [...options];
    updated[index][field] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, { name: '', description: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/poll', {
        question,
        options,
        expiresAt: expiresAt.toISOString(), // Send ISO format to backend
      });
      setMessage('Poll created successfully!');
      setQuestion('');
      setOptions([{ name: '', description: '' }]);
    } catch (err) {
      console.error(err);
      setMessage('Failed to create poll.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Poll</h2>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Poll Question</label>
          <input
            type="text"
            className="form-control"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Poll End Date/Time</label>
          <div>
            <DatePicker
              selected={expiresAt}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="form-control"
            />
          </div>
        </div>

        <h5>Options</h5>
        {options.map((opt, idx) => (
          <div className="mb-3" key={idx}>
            <input
              type="text"
              className="form-control mb-1"
              placeholder="Option name"
              value={opt.name}
              onChange={(e) => handleChange(idx, 'name', e.target.value)}
              required
            />
            <input
              type="text"
              className="form-control"
              placeholder="Option description (optional)"
              value={opt.description}
              onChange={(e) => handleChange(idx, 'description', e.target.value)}
            />
          </div>
        ))}

        <button type="button" className="btn btn-secondary mb-3" onClick={addOption}>
          Add Option
        </button>

        <button type="submit" className="btn btn-primary d-block">
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
