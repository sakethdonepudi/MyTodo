import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import Modal from 'react-modal';
import './styles.css'; // Ensure Tailwind CSS styles are imported

Modal.setAppElement('#root'); // For accessibility, set the root element

function App() {
  const [todos, setTodos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const addTodo = (todoText) => {
    if (todoText.trim() === '') return;
    const newTodo = {
      id: new Date().getTime(),
      text: todoText,
    };
    setTodos([...todos, newTodo]);
    setModalIsOpen(false); // Close the modal after todo is added
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="App bg-gray-900 min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-white text-2xl font-bold">Todo App</h1>
            </div>
            <div className="flex">
              <button
                onClick={() => setModalIsOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
              >
                Add Todo
              </button>
              <button
                onClick={() => setTodos([])}
                className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-screen-xl mx-auto mt-8">
        <div className="bg-gray-800 text-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-6 text-center">Welcome to MyToDo</h1>
  
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Add Todo Modal"
            className="modal"
            overlayClassName="overlay"
          >
            <TodoForm addTodo={addTodo} />
          </Modal>

          {/* Displaying todos as popups */}
          {todos.map((todo) => (
            <TodoPopup key={todo.id} text={todo.text} onDelete={() => deleteTodo(todo.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

// TodoPopup component using Tailwind CSS
const TodoPopup = ({ text, onDelete }) => {
  // Generate random background color class
  const randomColor = () => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-indigo-500'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div
      className={`todo-popup absolute top-0 left-0 w-full h-full flex items-center justify-center z-20 ${randomColor()} opacity-90`}
      style={{
        top: `${Math.random() * 100}vh`, // Random position from top
        left: `${Math.random() * 100}vw`, // Random position from left
      }}
    >
      <div className="bg-gray-800 border border-gray-700 shadow-lg rounded-lg p-4 m-4 text-white">
        <p className="text-lg font-semibold">{text}</p>
        <button
          onClick={onDelete}
          className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition duration-300 ease-in-out"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default App;
