import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([
    { text: "Task1", id: 1, completed: false },
    { text: "Task2", id: 2, completed: false },
    { text: "Task3", id: 3, completed: false },
  ]);
  const [deletedList, setDeletedList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");

  const handleAdd = () => {
    setTodos([...todos, { text: todo, id: Date.now(), completed: false }]);
    setTodo("");
  };

  const handleRemove = (deleteId) => {
    const deletedTodo = todos.find((todo) => {
      return todo.id == deleteId;
    });
    setDeletedList([...deletedList, deletedTodo]);

    const updatedList = todos.filter((todo) => {
      return todo.id != deleteId;
    });
    setTodos(updatedList);
  };

  const handletoggle = (toggleId) => {
    const updatedList = todos.map((todo) => {
      return todo.id == toggleId
        ? { ...todo, completed: !todo.completed }
        : todo;
    });
    setTodos(updatedList);
  };

  const handleEdit = (editId) => {
    setEditIndex(editId);
    setEditedTodo(todos.find((todo) => todo.id == editId).text);
  };

  const hadleSave = (saveId) => {
    const updatedlist = todos.map((todo) => {
      return todo.id == saveId ? { ...todo, text: editedTodo } : todo;
    });
    setTodos(updatedlist);
    setEditIndex(null);
    setEditedTodo("");
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={handleAdd}>Add task</button>

      <ul className="container">
        <h1>Your tasks</h1>
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="list-container">
              {editIndex == todo.id ? (
                <input
                  type="text"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
              ) : todo.completed ? (
                <li style={{ textDecoration: "line-through" }}>{todo.text}</li>
              ) : (
                <li>{todo.text}</li>
              )}

              <input
                type="checkbox"
                onChange={() => {
                  handletoggle(todo.id);
                }}
              />
              {editIndex == todo.id ? (
                <button onClick={() => hadleSave(todo.id)}>Save</button>
              ) : (
                <button onClick={() => handleEdit(todo.id)}>Edit</button>
              )}
              <button onClick={() => handleRemove(todo.id)}>Remove</button>
            </div>
          );
        })}
      </ul>

      <ul className="container">
        <h1>Completed tasks</h1>
        {deletedList.map((todo) => {
          return (
            <div key={todo.id} className="list-container">
              <li style={{ textDecoration: "line-through" }}>{todo.text}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
