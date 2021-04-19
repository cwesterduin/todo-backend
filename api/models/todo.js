const db = require('../dbConfig/init');
const SQL = require('sql-template-strings');

class Todo {
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.body = data.body
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const todosData = await db.query(`SELECT * FROM todos;`)
                const todos = todosData.rows.map(d => new Todo(d))
                resolve(todos);
            } catch (err) {
                reject("Error retrieving todos")
            }
        })
    }

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let todoData = await db.query(SQL`SELECT * FROM todos WHERE id = ${id};`);
                let todo = new Todo(todoData.rows[0]);
                resolve (todo);
            } catch (err) {
                reject('Todo not found');
            }
        });
    }

    static create(title, body){
        return new Promise (async (resolve, reject) => {
            try {
                let todoData = await db.query(SQL`INSERT INTO todos (title, body) VALUES (${title}, ${body}) RETURNING *;`);
                let newtodo = new Todo(todoData.rows[0]);
                resolve (newtodo);
            } catch (err) {
                reject('Error creating todo');
            }
        });
    }

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                await db.query(SQL `DELETE FROM todos WHERE id = ${this.id};`);
                resolve('todo was deleted')
            } catch (err) {
                reject('todo could not be deleted')
            }
        })
    }
    
}

module.exports = Todo