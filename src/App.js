import './App.css';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  useEffect(() => {
    const loadTodo = async () => {
      console.log("fetching");
      try {
        const resposta = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1');
        const resultado = await resposta.json();
        setTarefas(resultado.map(r => ({
            id: r.id,
            descricao: r.title,
            isChecked: r.completed
          })
        ));
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    };

    loadTodo();
  }, [])

  const addTarefa = () => {
    setTarefas(
      [
        { id: Math.random(), descricao: novaTarefa, isChecked: false }, ...tarefas
      ]
    );
    setNovaTarefa('');
  };

  const inputTarefa = (event) => {
    setNovaTarefa(event.target.value);
  };

  const deleteTarefa = (id) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  };

  const completeTarefa = (id) => {
    setTarefas(tarefas.map(tarefa => tarefa.id === id ? { ...tarefa, isChecked: !tarefa.isChecked } : tarefa));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="add-task-container">
        <input
          type="text"
          value={novaTarefa}
          onChange={inputTarefa}
          placeholder="Nova tarefa"
          className="task-input"
        />
        <button onClick={addTarefa} className="add-task-button">
          Add tarefa
        </button>
      </div>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id} className={`task-item ${tarefa.isChecked ? 'task-completed' : ''}`}>
            <input
              type="checkbox"
              checked={tarefa.isChecked}
              onChange={() => completeTarefa(tarefa.id)}
            />
            <span>
              {tarefa.descricao}
            </span>
            <button
              onClick={() => deleteTarefa(tarefa.id)}
              className="delete-button"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
