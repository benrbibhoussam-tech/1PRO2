import React, { useState, useEffect } from 'react';

const Card = ({ match }) => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      const response = await fetch(`http://localhost:1337/cards/${match.params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      const data = await response.json();
      setCard(data);
    };
    fetchCard();
  }, [match.params.id]);

  return (
    <div>
      {card ? (
        <>
          <h2>{card.title}</h2>
          <p>{card.description}</p>
          <p>Due Date: {card.dueDate}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Card;