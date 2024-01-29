class Task {
    #id;
    #name;
    #description;
    #date;
    #completed;

    constructor(name, description, date, completed) {
        this.#id = crypto.randomUUID();
        this.#name = name;
        this.#description = description;
        this.#date = date;
        this.#completed = completed;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get description() { return this.#description; }
    get date() { return this.#date; }
    get completed() { return this.#completed; }

    set completed(completed) { this.#completed = completed; }
}

class TaskList {
    #tasks = [];

    addTask(task) {
        this.#tasks.push(task);
        this.saveTasks();
    }

    editTask(id, updatedTask) {
        const taskIndex = this.#tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.#tasks[taskIndex] = updatedTask;
            this.saveTasks();
        }
    }

    deleteTask(id) {
        this.#tasks = this.#tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    getTasks() {
        return this.#tasks;
    }

    filterTasks(filter) {
        return this.#tasks.filter(task => task.completed === filter);
    }

    sortTasks(sortBy) {
        if (sortBy === 'name') {
            this.#tasks.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'date') {
            this.#tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.#tasks));
    }

    loadTasks() {
        this.#tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }
}

const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskDescriptionInput = document.getElementById('task-description');
const tasksList = document.getElementById('tasks-list');
const sortSelect = document.getElementById('sort-select');
const filterSelect = document.getElementById('filter-select');

const taskList = new TaskList();
taskList.loadTasks();

taskForm.addEventListener('submit', event => {
event.preventDefault();
const name = taskNameInput.value.trim();
const description = taskDescriptionInput.value.trim();
const date = new Date().toLocaleString();
const completed = false;

if (name === '' || description === '') {
    const task = new Task(name, description, date, completed);
    taskList.addTask(task);
    taskForm.reset();
    }
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
        });
        
        const nameElement = document.createElement('h2');
        nameElement.textContent = task.name;
        nameElement.addEventListener('click', () => {
            window.location.href = details.html?id=${task.id};
        });
        
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = task.description;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.deleteTask(task.id);
            renderTasks(taskList.getTasks());
        });
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            window.location.href = edit.html?id=${task.id};
        });
        
        taskElement.appendChild(checkbox);
        taskElement.appendChild(nameElement);
        taskElement.appendChild(descriptionElement);
        taskElement.appendChild(deleteButton);
        taskElement.appendChild(editButton);
        tasksList.appendChild(taskElement);
        });
        }
        
        function filterTasks(filter) {
            renderTasks(taskList.filterTasks(filter));
            }
            
            function sortTasks(sortBy) {
            taskList.sortTasks(sortBy);
            renderTasks(taskList.getTasks());
            }
            
            sortSelect.addEventListener('change', () => {
            sortTasks(sortSelect.value);
            });
            
            filterSelect.addEventListener('change', () => {
            filterTasks(filterSelect.value);
            });
            
            