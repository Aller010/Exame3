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