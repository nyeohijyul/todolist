function TodoList({ todos, onToggleDone, onDeleteTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => onToggleDone(todo.id)}
          />
          <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => onDeleteTodo(todo.id)}>삭제</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;