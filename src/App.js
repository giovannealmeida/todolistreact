import './App.css';
import React, { useState } from 'react';

const App = () => {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');

    const addTarefa = () => {
        setTarefas(tarefas.concat({id: Math.random(), descricao: novaTarefa, isChecked: false}));
        setNovaTarefa('');
    };

    const inputCheckBox = (id) => {
      setTarefas(tarefas.map(tarefa => {
        if (tarefa.id === id) {
          return {
            id: tarefa.id,
            descricao: tarefa.descricao,
            isChecked: !tarefa.isChecked
          };
        }
        return tarefa;
      }));
    };

    const inputTarefa = (event) => {
        setNovaTarefa(event.target.value);
    };

    const deleteTarefa = (id) => {
        setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
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
              <li key={tarefa.id} className="task-item">
                <input
                  type="checkbox"
                  checked={tarefa.isChecked}
                  onChange={() => inputCheckBox(tarefa.id)}
                />
                {tarefa.descricao}
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
