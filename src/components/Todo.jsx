import React, { useEffect, useState } from 'react';
import '../styles/todo.css';

function Todo() {
  const [task, setTask] = useState("");
  //note - indexeddb is better than localstorage here. Read why. (localstorage is synchronous)
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []); //[{value: "blabla", isCompleted: false, id: time}]

  const addTodo = () => {
    const newTodos = todos.map((todo) => {
      return { ...todo };
    });
    newTodos.push({
      value: task,
      isCompleted: false,
      id: new Date().getTime()
    });
    setTodos(newTodos);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(filteredTodos);
  }

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      } else {
        return {...todo};
      }
    });
    setTodos(updatedTodos);
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-container">
      <div>
        <input type="text" value={task} onKeyDown={handleKeyDown} onChange={(e) => { setTask(e.target.value); }} />
        <button onClick={addTodo} >Add Task</button>
      </div>
      <div>
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
              <span className={`${todo.isCompleted ? 'mark-complete': ''}`}>{todo.value}</span>
              <span className='cursor-pointer' onClick={() => completeTodo(todo.id)}>
                {!todo.isCompleted ? '✅' : '🔃'}
              </span>
              <span className='cursor-pointer' onClick={() => deleteTodo(todo.id)}>❌</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Todo