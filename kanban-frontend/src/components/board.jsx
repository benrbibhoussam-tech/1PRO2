import React, { useState, useEffect } from 'react';

const Board = ({ match }) => {
  const [board, setBoard] = useState(null);
  const [columns, setColumns] = useState([]);
  
  useEffect(() => {
    const fetchBoard = async () => {
      const response = await fetch(`http://localhost:1337/boards/${match.params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      const data = await response.json();
      setBoard(data);
      setColumns(data.columns);
    };
    fetchBoard();
  }, [match.params.id]);

  return (
    <div>
      {board ? (
        <>
          <h2>{board.name}</h2>
          <div>
            {columns.map((column) => (
              <div key={column.id}>
                <h3>{column.name}</h3>
                {column.cards.map((card) => (
                  <div key={card.id}>
                    <p>{card.title}</p>
                    <p>{card.description}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Board;