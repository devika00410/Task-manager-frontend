import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ onSubmit, initialData = {} }) => {
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: initialData?.priority || 'medium',
    dueDate: initialData?.dueDate ? initialData.dueDate.split('T')[0] : ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    onSubmit(formData);
    
    // Reset form only if we're creating a new task
    if (!initialData?.title) {
      setFormData({ 
        title: '', 
        description: '', 
        priority: 'medium', 
        dueDate: '' 
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
        className="task-form-input"
        required/>
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="task-form-textarea"
        rows="3"/>
      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="task-form-select">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="task-form-input"/>
      <button type="submit" className="task-form-button">
        {initialData?.title ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;