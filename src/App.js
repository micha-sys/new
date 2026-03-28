import React, { useState, useEffect } from 'react';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [category, setCategory] = useState('General Tasks');
    const [priority, setPriority] = useState('Medium');
    const [season, setSeason] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (!input) return;
        const newTask = {
            id: Date.now(),
            content: input,
            category,
            priority,
            season,
            dueDate,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        setInput('');
        setCategory('General Tasks');
        setPriority('Medium');
        setSeason('');
        setDueDate('');
    };

    const editTask = (id) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {...task, content: input};
            }
            return task;
        });
        setTasks(updatedTasks);
        setInput('');
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const completeTask = (id) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {...task, completed: !task.completed};
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <div>
            <h1>Farmer's Todo List</h1>
            <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Add a new task'
            />
            <select onChange={(e) => setCategory(e.target.value)}>
                <option value='Planting & Seeding'>Planting & Seeding</option>
                <option value='Crop Care'>Crop Care</option>
                <option value='Harvesting'>Harvesting</option>
                <option value='Equipment Maintenance'>Equipment Maintenance</option>
                <option value='Weather & Irrigation'>Weather & Irrigation</option>
                <option value='General Tasks'>General Tasks</option>
            </select>
            <select onChange={(e) => setPriority(e.target.value)}>
                <option value='Urgent'>Urgent</option>
                <option value='High'>High</option>
                <option value='Medium'>Medium</option>
                <option value='Low'>Low</option>
            </select>
            <input
                type='text'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder='Due Date'
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
                        {task.content} - {task.category} - {task.priority} - {task.season} - {task.dueDate}
                        <button onClick={() => editTask(task.id)}>Edit</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                        <button onClick={() => completeTask(task.id)}>{task.completed ? 'Undo' : 'Complete'}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;