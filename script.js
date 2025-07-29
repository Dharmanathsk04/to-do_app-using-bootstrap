document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const taskCounter = document.getElementById('taskCounter');
    const clearAllBtn = document.getElementById('clearAllBtn');
    
    let tasks = [];
    
    // Add task function
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            tasks.push(task);
            renderTasks();
            taskInput.value = '';
            updateCounter();
        }
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'list-group-item task-item d-flex justify-content-between align-items-center';
            li.dataset.id = task.id;

            const taskContent = document.createElement('span');
            taskContent.className = task.completed ? 'completed' : '';
            taskContent.textContent = task.text;

            const buttonsDiv = document.createElement('div');

            const completeBtn = document.createElement('button');
            completeBtn.className = 'btn btn-sm btn-success me-2';
            completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
            completeBtn.addEventListener('click', () => toggleComplete(task.id));

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-sm btn-danger';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            buttonsDiv.appendChild(completeBtn);
            buttonsDiv.appendChild(deleteBtn);

            li.appendChild(taskContent);
            li.appendChild(buttonsDiv);

            taskList.appendChild(li);
        });
    }

    function toggleComplete(id) {
        tasks = tasks.map(task =>
            task.id === id ? {...task, completed: !task.completed} : task
        );
        renderTasks();
        updateCounter();
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
        updateCounter();
    }

    function updateCounter() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        taskCounter.textContent = `${completedTasks} of ${totalTasks} tasks completed`;
    }

    function clearAllTasks() {
        tasks = [];
        renderTasks();
        updateCounter();
    }

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    clearAllBtn.addEventListener('click', clearAllTasks);
    
    // Initialize
    updateCounter();
});