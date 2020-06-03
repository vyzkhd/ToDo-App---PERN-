const express = require("express");
const cors = require("cors");
const pool = require("./db");
//const dotenv = require("dotenv");

const app = express();
//middleware
app.use(cors());
app.use(express.json()); //req.body

//dotenv.config();
//ROUTES

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});
//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error);
  }
});
// get a specific todo
app.get("/todos/:todoId", async (req, res) => {
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      req.params.todoId,
    ]);
    res.send(todo.rows);
  } catch (error) {
    console.log(error);
  }
});
//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("toto was updated");
  } catch (err) {
    console.error(err.message);
  }
});
//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});
app.listen(5000, () => {
  console.log(`server has started on port 5000`);
});
