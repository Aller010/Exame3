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