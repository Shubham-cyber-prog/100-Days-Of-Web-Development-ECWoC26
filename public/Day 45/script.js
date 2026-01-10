// Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks(tasks);

// Add Task
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks(tasks);
    taskInput.value = '';
});

// Task actions: complete/delete
taskList.addEventListener('click', (e) => {
    const id = e.target.closest('li')?.dataset.id;
    if (!id) return;

    if (e.target.classList.contains('complete-btn')) {
        tasks = tasks.map(task => task.id == id ? {...task, completed: !task.completed} : task);
    }

    if (e.target.classList.contains('delete-btn')) {
        tasks = tasks.filter(task => task.id != id);
    }

    saveTasks();
    renderTasks(tasks);
});

// Filter tasks
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active')?.classList.remove('active');
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        if (filter === 'all') renderTasks(tasks);
        if (filter === 'completed') renderTasks(tasks.filter(t => t.completed));
        if (filter === 'pending') renderTasks(tasks.filter(t => !t.completed));
    });
});

// Functions
function renderTasks(taskArray) {
    taskList.innerHTML = '';
    taskArray.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;

        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
