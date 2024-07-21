import React, { useState, useEffect } from 'react';
import { getTasks } from '../services/taskService';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm'; 
import './TaskList.css'; 
const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="task-list">
      <h1>Task List</h1>
      <TaskForm onTaskAdded={handleTaskAdded} /> 
      <div className="task-list-header">
        <span className="header-item">S.No</span>
        <span className="header-item">Title</span>
        <span className="header-item">Description</span>
        <span className="header-item">Status</span>
        <span className="header-item">Actions</span>
      </div>
      {tasks.map((task, index) => (
        <div className="task-item" key={task.id}>
          <span className="item-detail">{index + 1}</span>
          <span className="item-detail">{task.title}</span>
          <span className="item-detail">{task.description}</span>
          <span className="item-detail">{task.status}</span>
          <div className="item-actions">
            <TaskItem task={task} onTaskUpdated={setTasks} onTaskDeleted={setTasks} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
