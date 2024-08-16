import React from 'react';
import '../styles/taskItem.css';

function TaskItem({task, deleteTask, editTask, handleDrag}) {
  return (
    <div className="task-item" draggable onDrag={() => handleDrag(task)}>
      {task.title}
      <div>
        <span className='btn' onClick={() => editTask(task)}>✏️</span>
        <span className='btn' onClick={() => deleteTask(task)}>🗑️</span>
      </div>
    </div>
  )
}

export default TaskItem