import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function CreateTodo({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    const url = '/api/v1/todos'

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ todo: { title: value, done: false } })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        console.log(response);
      })
      .catch(() => console.log('Error trying to add todo.'));

    if (!value) return;

    addTodo(value);

    setValue("");
  }

  return (
    <form className="d-flex justify-content-center" onSubmit={handleSubmit}>
    <input
      type="text"
      value={value}
      placeholder="Add a new todo"
      maxLength="100"
      onChange={e => setValue(e.target.value)}
    />
    <input type="submit" value="Submit" />
    </form>
  );
};

// Function that shows all todos
// Includes the checkboxes, edit button, and destroy button
function Todo({ todo, index, deleteTodo }) {
  return (
    <li key={index} className="d-flex justify-content-between list-group-item">
      <span className="d-flex justify-content-between gap-2">
        <input className="" type="checkbox" checked={ todo.done ? true : false } />
        <div style={{ textDecoration: todo.done ? "line-through" : "" }}>{todo.title}</div>
      </span>
      <span className="d-flex justify-content-between gap-2">
        <FontAwesomeIcon className="d-flex justify-content-end" icon={faPenToSquare} />
        <FontAwesomeIcon className="d-flex justify-content-end" icon={faTrash} onClick={() => deleteTodo(todo.id)} />
      </span>
    </li>
  );
};

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const url = "/api/v1/todos";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => setTodos(data))
      .catch(() => navigate("/"));
  }, []);

  // Adding Todo
  const addTodo = todo => {
    setTodos([...todos, {title: todo, done: false}])
  };

  // Deleting Todo
  const deleteTodo = id => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    const url = `/api/v1/todos/${id}`

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
      },
    })
      .then(() => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    });
  };

  return (
    <>
      <div className="primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="text-center display-5">Todo List</h1>
            <hr className="my-4" />
            <CreateTodo addTodo={addTodo} />

            <div className="mt-4">
              <ul className="list-group">
                {todos.map((todo, index) => (
                  <Todo todo={todo} key={index} deleteTodo={deleteTodo} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
