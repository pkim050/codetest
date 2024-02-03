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
function Todo({ todo, index, toggleComplete, editTodo, deleteTodo }) {
  return (
    <li key={index} className="d-flex justify-content-between list-group-item">
      <span className="d-flex justify-content-between gap-2">
        <input className="" type="checkbox" onClick={() => toggleComplete(todo.id)} checked={ todo.done ? true : false } />
        <div style={{ textDecoration: todo.done ? "line-through" : "" }}>{todo.title}</div>
      </span>
      <span className="d-flex justify-content-between gap-2">
        <FontAwesomeIcon className="d-flex justify-content-end" icon={faPenToSquare} onClick={() => editTodo(todo.id)} />
        <FontAwesomeIcon className="d-flex justify-content-end" icon={faTrash} onClick={() => deleteTodo(todo.id)} />
      </span>
    </li>
  );
};

// Function that edits the todo description/title
function EditTodo({ editTodo, todo }) {
  const [value, setValue] = useState(todo.title)

  const handleSubmit = e => {
    e.preventDefault();

    const url = `/api/v1/todos/${todo.id}`

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ todo: { title: value, done: todo.done } })
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
      .catch(() => console.log('Error trying to edit todo.'));

    if (!value) return;

    editTodo(value, todo.id);

    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        placeholder="Update Todo"
        onChange={(e) => setValue(e.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState(0);

  useEffect(() => {
    setCompletedTodos(todos.filter(todo => todo.done).length)
  });

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

  const toggleComplete = id => {
    const url = `/api/v1/todos/${id}`

    const token = document.querySelector('meta[name="csrf-token"]').content;

    const todo = todos.find(todo => todo.id === id)

    fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
      },
      body: JSON.stringify({ todo: { title: todo.title, done: !todo.done } })
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
      .catch(() => console.log('Error trying to edit todo.'));
      setTodos(todos.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo))
  };

  const editTodo = id => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
  };

  const updateTodo = (title, id) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, title, isEditing: !todo.isEditing} : todo))
  };

  return (
    <>
      <div className="primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="text-center display-5">Todo List</h1>
            <div className="text-center"><progress value={completedTodos} max={todos.length} /> {completedTodos} / {todos.length} Todos Completed</div>
            <hr className="my-4" />
            <CreateTodo addTodo={addTodo} />

            <div className="mt-4">
              <ul className="list-group">
                {todos.map((todo, index) => (
                  todo.isEditing ? (
                    <EditTodo todo={todo} key={index} editTodo={updateTodo} />
                  ) : (
                    <Todo todo={todo} key={index} toggleComplete={toggleComplete} editTodo={editTodo} deleteTodo={deleteTodo} />
                  )
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
