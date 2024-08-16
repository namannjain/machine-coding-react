import React, { useState } from 'react';
import TaskItem from './TaskItem';
import '../styles/kanban.css';

//draggable, onDrag, onDrop, onDragOver
//data-status - html attribute (data-) inside jsx html to store attributes inside it for further usecases

const STATES = {
  'SPRING_BACKLOG': {
    label: "Spring Backlog",
    id: "springBacklog"
  },
  'IN_PROGRESS': {
    label: "In Progress",
    id: "inProgress"
  },
  'UNDER_REVIEW': {
    label: "Under Review",
    id: "underReview"
  },
  'MERGED': {
    label: "Merged",
    id: "merged"
  }
};
const defaultStates = Object.entries(STATES);

function KanbanDragDrop({ states = defaultStates }) {
  const [inputTask, setInputTask] = useState('');
  const [draggedTask, setDraggedTask] = useState(null);
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [progressTasks, setProgressTasks] = useState([]);
  const [reviewTasks, setReviewTasks] = useState([]);
  const [mergedTasks, setMergedTasks] = useState([]);

  const getTasksStateVarOrSetterById = (id, isSetter = false) => {
    switch (id) {
      case STATES.IN_PROGRESS.id:
        return isSetter ? setProgressTasks : progressTasks;
      case STATES.UNDER_REVIEW.id:
        return isSetter ? setReviewTasks : reviewTasks;
      case STATES.MERGED.id:
        return isSetter ? setMergedTasks : mergedTasks;
      default:
        return isSetter ? setBacklogTasks : backlogTasks;
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  }

  const addTask = (status = STATES.SPRING_BACKLOG.id, title=null) => {
    const setterFunc = getTasksStateVarOrSetterById(status, true);
    setterFunc((prevTasks) => [...prevTasks, {
      title: title ? title : inputTask,
      id: new Date().getTime(),
      status: status
    }]);
    setInputTask('');
  }

  const editTask = (task) => {

  }

  const deleteTask = ({title, id, status}) => {
    const filteredTasks = getTasksStateVarOrSetterById(status).filter((task) => {
      return task.id !== id;
    });
    const setterFunc = getTasksStateVarOrSetterById(status, true);
    setterFunc(filteredTasks);
  }

  const handleDrag = (task) => {
    setDraggedTask(task);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDrop = (e) => {
    const taskStatus = e.target.getAttribute('data-status');
    if (taskStatus !== draggedTask.status) {
      deleteTask(draggedTask);
      addTask(taskStatus, draggedTask.title);
      setDraggedTask(null);
    }
  }

  return (
    <div className="kanban">
      <h1>Kanban Board</h1>
      <input type="text" value={inputTask} onKeyDown={handleKeyDown} onChange={(e) => setInputTask(e.target.value) } />
      <div className='board__container'>
        {states.map(([key, { label, id }], ind) => {
          return (
            <div key={id}
              className={`${id}`}
              data-status={`${id}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <h2>{label}</h2>
              <div className='tasks-list'>
                {getTasksStateVarOrSetterById(id).map((task, taskInd) => {
                  return (
                    <TaskItem id={`${ind}-${id}`} task={task} deleteTask={deleteTask} editTask={editTask} handleDrag={handleDrag} />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default KanbanDragDrop