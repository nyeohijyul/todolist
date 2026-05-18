// import { useState } from "react";
// import Todo from "./Todo";
// import './App.css'

// function App() {
//   return <Todo />;
// }

// export default App;

import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import TodoHeader from "./components/TodoHeader";
import ApiPage from "./pages/ApiPage";
import CompletedPage from "./pages/CompletedPage";
import ActivePage from "./pages/ActivePage";
import TodosPage from "./pages/TodosPage";
import { todos } from "./data/todos";
function App() {
  // Todo 목록 state입니다. localStorage에 저장된 값이 있으면 그 값을 먼저 불러옵니다.
  const [todoItems, setTodoItems] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : todos;
  });
  // Todo 목록이 바뀔 때마다 localStorage에 저장해 새로고침 후에도 유지합니다.
  useEffect(() => {
    console.log("todos가 변경될 때만 localStorage에 저장됩니다.");
    localStorage.setItem("todos", JSON.stringify(todoItems));
  }, [todoItems]);
  // TodoItem을 클릭했을 때 해당 Todo의 완료 상태를 반대로 바꿉니다.
  const handleTodoClick = (id) => {setTodoItems((prevTodos) =>
    prevTodos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo)
    );
  };
  // TodosPage에서 새 Todo를 만들면 이 함수로 App의 Todo 목록에 추가합니다.
  const handleAddTodo = (newTodo) => {
    setTodoItems((prevTodos) => [...prevTodos, newTodo]);
  };
  return (
    <>
    {/* 모든 페이지에서 공통으로 보여줄 제목과 페이지 이동 메뉴입
    니다. */}
    <TodoHeader title="Todo List" />
    <Navigation />
    {/* URL 경로에 따라 어떤 페이지 컴포넌트를 보여줄지 정합니다. */}
    <Routes>
      <Route path="/" element={<Navigate to="/todos" replace />} />
      <Route
        path="/todos"
        element={
          <TodosPage
            todos={todoItems}
            onAddTodo={handleAddTodo}
            onTodoClick={handleTodoClick}
          />
        }
      />
      <Route
        path="/completed" element={
          <CompletedPage todos={todoItems} onTodoClick={handleTodoClick} onAddTodo={handleAddTodo} />
        }
      />
      <Route
        path="/active" element={
          <ActivePage todos={todoItems} onTodoClick={handleTodoClick} onAddTodo={handleAddTodo} />
        }
      />
      <Route path="/api" element={<ApiPage />} />
    </Routes>
    </>
  );
}
export default App;