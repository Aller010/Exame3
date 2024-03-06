const taskList = new TaskList();
taskList.loadTasks();

const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskDescriptionInput = document.getElementById('task-description');
const tasksList = document.getElementById('tasks-list');
const sortSelect = document.getElementById('sort-select');
const filterSelect = document.getElementById('filter-select');


function isValidName(name) {
    let english = /^[a-zA-Z]{1,16}$/;
    let russian = /^[а-яА-Я]{1,16}$/;
    let split = name.split(/\s/);
    if (split.length > 1) {
        for (let i = 0; i < split.length; i++) {
            if (!english.test(split[i]) && !russian.test(split[i])) {
                return false;
            }
        }
    }

    return split.length > 1;
}

function isValidDescription(description) {
    let english = /^[a-zA-Z]{1,16}$/;
    let russian = /^[а-яА-Я]{1,16}$/;
    let number = /^[0-9]{1,16}$/;
    let split = description.split(/\s/);

    if (split.length > 1) {
        for (let i = 0; i < split.length; i++) {
            if (!english.test(split[i]) && !russian.test(split[i]) && !number.test(split[i])) {
                return false;
            }
        }
    }

    return true;
}

function validateForm() {
    const name = taskNameInput.value;
    const description = taskDescriptionInput.value;

    if (name.length === 0 || description.length === 0) {
        alert('Invalid input');
        return false;
    }
    return true;
}

taskForm.addEventListener('submit', event => {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const name = taskNameInput.value.trim();
    const description = taskDescriptionInput.value.trim();
    const date = new Date();
    const completed = false;

    const task = new Task(name, description, date, completed);

    taskList.addTask(task);

    taskList.sortTasks(sortSelect.value);
    renderTasks(taskList.filterTasks(filterSelect.value));
    taskForm.reset();
});

function renderTasks(tasks) {
    tasksList.innerHTML = '';
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            taskList.editTask(task.id, task);
            renderTasks(taskList.filterTasks(filterSelect.value));
        });

        const nameElement = document.createElement('h2');
        nameElement.textContent = task.name;
        nameElement.addEventListener('click', () => {
            window.location.href = 'Details.html?id=' + task.id;
        });


        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.deleteTask(task.id);
            taskList.sortTasks(sortSelect.value);
            renderTasks(taskList.filterTasks(filterSelect.value));
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            window.location.href = 'Edit.html?id=' + task.id;
        });

        taskElement.appendChild(checkbox);
        taskElement.appendChild(nameElement);
        taskElement.appendChild(deleteButton);
        taskElement.appendChild(editButton);
        tasksList.appendChild(taskElement);
    });
}

function filterTasks(filter) {
    const filteredTasks = taskList.filterTasks(filter);
    renderTasks(filteredTasks);
}

function sortTasks(sortBy) {
    taskList.sortTasks(sortBy);
    renderTasks(taskList.filterTasks(filterSelect.value));
}

sortSelect.addEventListener('change', () => {
    sortTasks(sortSelect.value);
});

filterSelect.addEventListener('change', () => {
    filterTasks(filterSelect.value);
});

renderTasks(taskList.filterTasks("Date"));
