import React, { useState, useEffect } from 'react';
import './style.css';

const TaskMaster = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("toDoTask")) ?? [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("toDoTask", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      alert("Input Is Empty");
      return;
    }

    const newTask = {
      id: Date.now(),
      data: trimmedValue
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(item => item.id !== id);
    setTasks(filteredTasks);
  };

  const updateTask = (id) => {
    const taskToEdit = tasks.find(item => item.id === id);
    const editedText = prompt("Edit Your Task", taskToEdit.data);

    if (editedText !== null && editedText.trim() !== "") {
      const updatedTasks = tasks.map(item => 
        item.id === id ? { ...item, data: editedText.trim() } : item
      );
      setTasks(updatedTasks);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <div className="container">
      {/* Structure HTML issue de index.html */}
      <h2>Task Master <i className="fa-solid fa-bolt"></i></h2>
      
      <div className="input-wrapper">
        <input 
          id="inp" 
          type="text" 
          placeholder="Enter task here.." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          autoComplete="off"
        />
        <i 
          id="addBtn" 
          className="fa-solid fa-plus" 
          onClick={addTask}
        ></i>
      </div>

      <ul className="task-list">
        {tasks.map((item) => (
          <li key={item.id}>
            <p>{item.data}</p>
            <div className="btns">
              <i 
                className="fa-solid fa-pen-to-square" 
                onClick={() => updateTask(item.id)}
              ></i>
              <i 
                className="fa-solid fa-trash" 
                onClick={() => deleteTask(item.id)}
              ></i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskMaster;