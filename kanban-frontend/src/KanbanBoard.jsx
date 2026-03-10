import React, { useState, useEffect } from 'react';
import './style.css';

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);

  // Chargement initial
  useEffect(() => {
    const savedBoard = JSON.parse(localStorage.getItem("kanbanBoard")) ?? [
      { id: 'col-1', title: 'À faire', cards: [] }
    ];
    setColumns(savedBoard);
  }, []);

  // Sauvegarde auto
  useEffect(() => {
    localStorage.setItem("kanbanBoard", JSON.stringify(columns));
  }, [columns]);

  // --- LOGIQUE COLONNES ---
  const addColumn = () => {
    const title = prompt("Nom de la nouvelle colonne ?");
    if (title) {
      setColumns([...columns, { id: Date.now().toString(), title, cards: [] }]);
    }
  };

  const deleteColumn = (colId) => {
    if (window.confirm("Supprimer cette colonne et toutes ses cartes ?")) {
      setColumns(columns.filter(col => col.id !== colId));
    }
  };

  const renameColumn = (colId) => {
    const newTitle = prompt("Nouveau nom ?");
    if (newTitle) {
      setColumns(columns.map(col => col.id === colId ? { ...col, title: newTitle } : col));
    }
  };

  // --- LOGIQUE CARTES ---
  const addCard = (colId) => {
    const title = prompt("Titre de la carte ?");
    if (!title) return;

    setColumns(columns.map(col => {
      if (col.id === colId) {
        return {
          ...col,
          cards: [...col.cards, {
            id: Date.now().toString(),
            title,
            description: '',
            dueDate: '',
            labels: []
          }]
        };
      }
      return col;
    }));
  };

  const deleteCard = (colId, cardId) => {
    setColumns(columns.map(col => {
      if (col.id === colId) {
        return { ...col, cards: col.cards.filter(card => card.id !== cardId) };
      }
      return col;
    }));
  };

  const editCard = (colId, cardId) => {
    const col = columns.find(c => c.id === colId);
    const card = col.cards.find(rd => rd.id === cardId);

    const newTitle = prompt("Modifier le titre", card.title) || card.title;
    const newDesc = prompt("Modifier la description", card.description) || card.description;
    const newDate = prompt("Date d'échéance (ex: 2024-12-31)", card.dueDate) || card.dueDate;
    const newLabels = prompt("Labels (séparés par des virgules)", card.labels.join(',')) || "";

    setColumns(columns.map(c => {
      if (c.id === colId) {
        return {
          ...c,
          cards: c.cards.map(rd => rd.id === cardId ? {
            ...rd,
            title: newTitle,
            description: newDesc,
            dueDate: newDate,
            labels: newLabels.split(',').filter(l => l.trim() !== "")
          } : rd)
        };
      }
      return c;
    }));
  };

  return (
    <div className="kanban-wrapper">
      <div className="board-header">
        <h1>Kanban Pro <i className="fa-solid fa-layer-group"></i></h1>
        <button className="add-col-btn" onClick={addColumn}>+ Ajouter une colonne</button>
      </div>

      <div className="kanban-container">
        {columns.map(col => (
          <div key={col.id} className="column">
            <div className="column-header">
              <h3 onClick={() => renameColumn(col.id)}>{col.title}</h3>
              <i className="fa-solid fa-trash-can" onClick={() => deleteColumn(col.id)}></i>
            </div>

            <div className="card-list">
              {col.cards.map(card => (
                <div key={card.id} className="card">
                  <div className="card-actions">
                    <i className="fa-solid fa-pen" onClick={() => editCard(col.id, card.id)}></i>
                    <i className="fa-solid fa-xmark" onClick={() => deleteCard(col.id, card.id)}></i>
                  </div>
                  
                  <h4>{card.title}</h4>
                  {card.description && <p className="card-desc">{card.description}</p>}
                  
                  <div className="card-footer">
                    {card.dueDate && <span className="due-date"><i className="fa-regular fa-calendar"></i> {card.dueDate}</span>}
                    <div className="labels">
                      {card.labels.map((l, i) => <span key={i} className="label-tag">{l}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="add-card-btn" onClick={() => addCard(col.id)}>+ Ajouter une carte</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;