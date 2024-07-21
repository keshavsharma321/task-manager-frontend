import React from 'react';
import { updateTask, deleteTask } from '../services/taskService';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const handleStatusChange = async (e) => {
    try {
      const updatedTask = await updateTask(task.id, e.target.value);
      onTaskUpdated((prevTasks) =>
        prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      onTaskDeleted((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div>
      <select value={task.status} onChange={handleStatusChange}>
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
