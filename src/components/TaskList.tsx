import { ChangeEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './TaskList.scss'

import { FiTrash, FiPlusCircle } from 'react-icons/fi'

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('')

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle) {
      setTasks([
        ...tasks,
        {
          id: uuidv4(),
          title: newTaskTitle,
          isComplete: false,
        }
      ]);

      setNewTaskTitle('');
    } else {
      console.log('Não é possível adicionar uma tarefa vazia.');
    }
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskTitle(event.target.value);
  }

  function handleToggleTaskCompletion(id: string) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    setTasks(tasks.map(task => task.id === id ? { ...task, isComplete: !task.isComplete } : { ...task }));
  }

  function handleRemoveTask(id: string) {
    // Remova uma task da listagem pelo ID
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <section className="task-list container">
      <header>

        <div className="input-group">
          <input
            type="text"
            placeholder='Adicionar nova tarefa'
            onChange={handleNewCommentChange}
            value={newTaskTitle}
          />
          <button type='submit' onClick={handleCreateNewTask}>
            Criar
            <FiPlusCircle size={18} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''}>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>
              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
}