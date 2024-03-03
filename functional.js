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
    get name() {
        return this.#name;
    }
    set name(value) { this.#name = value.trim(); }
    get description() { return this.#description; }
    set description(value) { this.#description = value.trim(); }
    get date() { return this.#date; }
    get completed() { return this.#completed; }
    set completed(value) { this.#completed = value; }

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            description: this.#description,
            date: this.#date,
            completed: this.#completed
        }; 
    }
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
        return this.#tasks.filter(task => {
            if (filter === 'completed') {
                return task.completed === true;
            } else if (filter === 'uncompleted') {
                return task.completed === false;
            } else {
                return true;
            }
        });
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

