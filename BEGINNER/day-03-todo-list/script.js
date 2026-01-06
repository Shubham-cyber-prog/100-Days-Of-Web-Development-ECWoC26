const taskInput = document.getElementById("task-input");
const btn = document.querySelector("button");
const taskList = document.getElementById("task-list");
const emptyImg = document.querySelector(".empty-img");
const todosContainer = document.querySelector(".todos-container");
const progressbar = document.querySelector('#progress');
const progressNos = document.querySelector('#progress-nos');


const emptyState = () => {
    const isEmpty = taskList.children.length === 0;
    emptyImg.style.display = isEmpty ? "block" : "none";
    todosContainer.style.overflow = isEmpty ? "hidden" : "auto";
}

const updateProgress = (checkCompletion = true) => {
    const totalTasks = taskList.children.length;
    const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;
    progressbar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';
    progressNos.textContent = `${completedTasks}/${totalTasks}`;

    if (checkCompletion && totalTasks > 0 && completedTasks === totalTasks) {
        celebrate();
    }
};

function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
        text: li.querySelector('span').textContent,
        completed: li.querySelector('.checkbox').checked
    }))
    localStorage.setItem('tasks', JSON.stringify(tasks));
    emptyState();
    updateProgress();
}

function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(({ text, completed }) => addTask(text, completed, false));
}


const addTask = (text, completed = false,
    checkCompletion = true) => {
    const taskText = text || taskInput.value.trim();
    if (!taskText) return;

    const li = document.createElement("li")
    li.innerHTML = `
    <input type='checkbox' class="checkbox" ${completed ? 'checked' : ''} />
    <span>${taskText}</span>
    <div class="task-buttons">
        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class="del-btn"><i class="fa-solid fa-trash"></i></button>
    </div>`;

    li.querySelector('.del-btn').addEventListener('click', () => {
        li.remove();
        emptyState();
        updateProgress(checkCompletion);
        saveTasksToLocalStorage();
    })

    const checkbox = li.querySelector('.checkbox')
    const editBtn = li.querySelector('.edit-btn');

    if (completed) {
        li.classList.add('completed')
        editBtn.disabled = true;
        editBtn.style.opacity = '0.5';
        editBtn.style.pointerEvents = 'none';
    }

    checkbox.addEventListener('change', () => {
        const isChecked = checkbox.checked;
        li.classList.toggle('completed', isChecked);
        editBtn.style.opacity = isChecked ? '0.5' : '1';
        editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
        updateProgress();
        saveTasksToLocalStorage();
    })

    editBtn.addEventListener('click', () => {
        if (!checkbox.checked) {
            taskInput.value = li.querySelector('span').textContent;
            li.remove();
            emptyState();
            updateProgress(false);
            saveTasksToLocalStorage();
        }
    })

    taskList.prepend(li);
    taskInput.value = "";
    emptyState();
    updateProgress();
    saveTasksToLocalStorage();
}

btn.addEventListener("click", () =>
    addTask());
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask()
    }

})
const celebrate = () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
}
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
