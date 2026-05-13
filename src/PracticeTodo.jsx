import { useState } from "react";

function PracticeTodo() {
  const [todos, setTodos] = useState([
    {id: 1, text: '과제하기', done: false},
    {id: 2, text: '멋사 과제', done: false},
    {id: 3, text: '청소하기', done: false},
  ])
  const handleIsDone = (index) => {
    // todos[index - 1].done = true;
    const updated = [...todos];
    updated[index - 1].done = !updated[index - 1].done;
    // console.log(updated);
    setTodos(updated);
  }
  /* ✏️✔️📝✅ */
  return (
    <div>
        <h2>To Do List</h2>
        <ul>
            {todos.map(item => (
                <li key={item.id} onClick={() => handleIsDone(item.id)}>{item.text} {item.done ? '✅' : '📝'}</li>
            ))}
        </ul>
    </div>
  )
}

export default PracticeTodo;