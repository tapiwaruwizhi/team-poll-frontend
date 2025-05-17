import { useEffect } from 'react';

const useVoteSocket = (onMessage) => {
  useEffect(() => {


    const socket = new WebSocket(`ws://localhost:3000/ws/votes`);

    socket.onopen = () => {
      console.log('Connected to WebSocket for poll:');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, [onMessage]);
};

export default useVoteSocket;
