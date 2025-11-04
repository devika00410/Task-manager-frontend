import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#27ae60';
      default: return '#95a5a6';
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className="task-priority"
          style={{ backgroundColor: getPriorityColor(task.priority) }}>
          {task.priority}
        </span>
      </div>
      
      <p className="task-description">{task.description}</p>
      
      <div className="task-footer">
        <div className="task-dates">
          {task.dueDate && (
            <span className="due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
          )}
          <span className="created-date">Created: {new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div className="task-actions">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task._id, !task.completed)}
            className="task-checkbox"/>
          <button 
            onClick={() => onEdit(task)}
            className="task-edit-btn">
            Edit
          </button>
          <button 
            onClick={() => onDelete(task._id)}
            className="task-delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;