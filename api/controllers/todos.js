const express = require('express');
const router = express.Router();

const Todo = require('../models/todo')

// todos index route
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.all
        res.json({todos})
    } catch(err) {
        res.status(500).json({err})
    }
})

// todos show route
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(parseInt(req.params.id))
        res.json(todo)
    } catch(err) {
        res.status(404).json({err})
    }
})

// Create todo route
router.post('/', async (req, res) => {
    try {
        const todo = await Todo.create(req.body.title, req.body.body)
        res.json(todo)
    } catch(err) {
        res.status(404).json({err})
    }
})

// delete todo route
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(parseInt(req.params.id))
        await todo.destroy()
        res.status(204).json('todo deleted')
    } catch(err) {
        res.status(500).json({err})
    }
})

// toggle todo status
router.patch('/:id/toggle', async (req, res) => {
    try {
        const todo = await Todo.findById(parseInt(req.params.id))
        await todo.toggle()
        res.status(204).json('todo toggled')
    } catch(err) {
        res.status(500).json({err})
    }
})

module.exports = router;
