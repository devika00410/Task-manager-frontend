import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/authContext';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../Components/TaskForm';
import TaskItem from '../Components/TaskItem';
import API from '../Services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, [user, navigate]);

  const fetchTasks = async () => {
    try {
      const response = await API.get('/tasks');
      setTasks(response.data.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await API.post('/tasks', taskData);
      setTasks([response.data.data, ...tasks]);
    } catch (error) {
      console.error('Failed to create task:', error);
      alert('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await API.put(`/tasks/${editingTask._id}`, taskData);
      setTasks(tasks.map(task => 
        task._id === editingTask._id ? response.data.data : task
      ));
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task:', error);
      alert('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task');
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const response = await API.put(`/tasks/${taskId}`, { completed });
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data.data : task
      ));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Tasks</h1>
        <div className="task-stats">
          <span className="stat-total">Total: {tasks.length}</span>
          <span className="stat-completed">
            Completed: {tasks.filter(t => t.completed).length}
          </span>
          <span className="stat-pending">
            Pending: {tasks.filter(t => !t.completed).length}
          </span>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="task-form-section">
          <h2 className="section-title">
            {editingTask ? 'Edit Task' : 'Create New Task'}
          </h2>
          <TaskForm 
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            initialData={editingTask || {}}/>
          {editingTask && (
            <button 
              onClick={() => setEditingTask(null)}
              className="cancel-edit-btn">
              Cancel Edit
            </button>
          )}
        </div>

        <div className="tasks-section">
          <div className="tasks-header">
            <h2 className="section-title">Your Tasks</h2>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}>
                All
              </button>
              <button 
                className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}>
                Pending
              </button>
              <button 
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}>
                Completed
              </button>
            </div>
          </div>

          <div className="tasks-list">
            {filteredTasks.length === 0 ? (
              <div className="no-tasks">
                <p>No tasks found. {filter !== 'all' && 'Try changing the filter.'}</p>
              </div>
            ) : (
              filteredTasks.map(task => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onToggleComplete={handleToggleComplete}/>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;