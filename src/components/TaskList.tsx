import { useState, version } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { BiAddToQueue } from 'react-icons/bi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [mensageError, setMensageError] = useState('')

  function isNullOrWhitespace( input:String ) {

    if (typeof input === 'undefined' || input == null) return true;

    return input.replace(/\s/g, '').length < 1;
  }

  function handleCreateNewTask() {
        if(isNullOrWhitespace(newTaskTitle)){
          setMensageError("Please type something");
          return;
        }
        if(tasks.length === 1000){
          setMensageError("Task limit reached");
          return;
        }
        setMensageError("");


        let randomNumber = Number(Math.floor(Math.random() * (1000 - 1)) + 1);
        while(tasks.find( task => task.id === randomNumber )){
          randomNumber = Number(Math.floor(Math.random() * (1000 - 1)) + 1);
        }

        setTasks([...tasks, {
          id: randomNumber,
          title: newTaskTitle,
          isComplete: false
        }])
  }

  function handleToggleTaskCompletion(id: number) {
    const task =tasks.filter((task)=>{
      if(task.id === id){
        task.isComplete = !task.isComplete;               
      }
      return task;
    });
    setTasks(task);      
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter(function(task) { 
      return task.id !== id
      }));
  }

  return (
    <section className="task-list container">
      <header>
        <h2>My tasks</h2>

        <div className="input-group">
          <div>
            <input 
              type="text" 
              placeholder="Adicionar novo todo" 
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
              <BiAddToQueue size={16} color="#fff" />
            </button>
          </div>
          <p>{mensageError}</p>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
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
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}