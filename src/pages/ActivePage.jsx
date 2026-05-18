import { useState } from "react";
import TodoList from "../components/TodoList";
function ActivePage({ todos, onTodoClick, onAddTodo }) {
    // input에 입력한 할 일 내용을 state로 관리합니다.
    const [todoText, setTodoText] = useState("");
    // form이 제출되면 새 Todo 객체를 만들어 App.jsx로 전달합니다.
    const handleAddTodo = (event, priority) => {
        event.preventDefault();
        // 앞뒤 공백을 제거해서 빈 값이 추가되지 않도록 검사합니다.
        const trimmedText = todoText.trim();
        if (!trimmedText) {return;}
        // 새 Todo에 들어갈 생성 날짜를 YYYY.MM.DD 형식으로 만듭니다.
        const today = new Date();
        const createdAt = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;
        // App.jsx에서 받은 onAddTodo 함수를 호출해 전체 Todo 목록에새 항목을 추가합니다.
        onAddTodo({
            id: Date.now(),
            text: trimmedText,
            priority,
            createdAt,
            done: false,
        });
        // 추가가 끝나면 input 값을 비워 다음 입력을 받을 수 있게 합니다.
        setTodoText("");
    };
    // 기존 Todo 배열에서 완료되지 않은 Todo만 filter로 골라 활성 페이지에 보여줍니다.
    const activeTodos = todos.filter((todo) => !todo.done);
    return (
        <>
            <input
                id="newTask"
                type="text"
                value={todoText}
                onChange={(event) => setTodoText(event.target.value)}
                placeholder="새 할 일을 입력하세요"
            />
            <TodoList
                sectionTitle="남은 할 일"
                todos={activeTodos}
                onTodoClick={onTodoClick}
                onAddTodo={handleAddTodo}
            />
        </>);
}
export default ActivePage;