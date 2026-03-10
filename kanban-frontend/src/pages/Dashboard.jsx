import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

const Dashboard = () => {
  const [columns, setColumns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("kanban_v2")) ?? [
      { id: '1', title: 'À faire', cards: [] }
    ];
    setColumns(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("kanban_v2", JSON.stringify(columns));
  }, [columns]);

  const addColumn = () => {
    setColumns([...columns, { id: Date.now().toString(), title: "Nouvelle Colonne", cards: [] }]);
  };

  const deleteColumn = (id) => {
    if(window.confirm("Supprimer la colonne ?")) setColumns(columns.filter(c => c.id !== id));
  };

  const renameColumn = (id, newTitle) => {
    setColumns(columns.map(c => c.id === id ? { ...c, title: newTitle } : c));
  };

  const addCard = (colId) => {
    const title = prompt("Nom de la tâche ?");
    if (!title) return;
    setColumns(columns.map(col => {
      if (col.id === colId) {
        return { ...col, cards: [...col.cards, { 
          id: Date.now().toString(), 
          title, 
          description: "Ajouter une description...", 
          dueDate: "2026-03-30", 
          labels: ["Urgent"] 
        }]};
      }
      return col;
    }));
  };

  const editCard = (colId, cardId) => {
    const col = columns.find(c => c.id === colId);
    const card = col.cards.find(ca => ca.id === cardId);
    const newTitle = () => {
    setCard([...card, { id: Date.now().toString(), title: "Nouvelle Carte", description: "Ajouter une description...", dueDate: "2026-03-30", labels: ["Urgent"] }]);
  };
    const newDesc = prompt("Description :", card.description);
    const newDate = prompt("Échéance (AAAA-MM-JJ) :", card.dueDate);
    
    setColumns(columns.map(c => {
      if (c.id === colId) {
        return { ...c, cards: c.cards.map(ca => ca.id === cardId ? { 
          ...ca, title: newTitle, description: newDesc, dueDate: newDate 
        } : ca)};
      }
      return c;
    }));
  };

  const deleteCard = (colId, cardId) => {
    setColumns(columns.map(col => col.id === colId ? { ...col, cards: col.cards.filter(ca => ca.id !== cardId) } : col));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="kanban-wrapper">
      <div className="board-header">
        <h1>Mon Tableau <i className="fa-solid fa-bolt"></i></h1>
        <div className="btns-top">
           <button className="add-col-btn" onClick={addColumn}>+ Colonne</button>
           <button className="logout-btn" onClick={handleLogout}>Quitter</button>
        </div>
      </div>

      <div className="kanban-container">
        {columns.map(col => (
          <div key={col.id} className="column">
            <div className="column-header">
              {/* Remplacement du h3 par un input invisible pour renommer en direct */}
              <input 
                className="col-title-input"
                value={col.title} 
                onChange={(e) => renameColumn(col.id, e.target.value)}
              />
              <i className="fa-solid fa-trash" onClick={() => deleteColumn(col.id)}></i>
            </div>

            <div className="card-list">
              {col.cards.map(card => (
                <div key={card.id} className="card">
                  <div className="card-actions">
                    <i className="fa-solid fa-pen" onClick={() => editCard(col.id, card.id)}></i>
                    <i className="fa-solid fa-xmark" onClick={() => deleteCard(col.id, card.id)}></i>
                  </div>
                  <h4>{card.title}</h4>
                  <p className="card-desc">{card.description}</p>
                  <div className="card-footer">
                    <span className="due-date">📅 {card.dueDate}</span>
                    <div className="labels">
                      {card.labels.map((l, i) => <span key={i} className="label-tag">{l}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="add-card-btn" onClick={() => addCard(col.id)}>+ Carte</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;