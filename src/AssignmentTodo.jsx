import { useState, useEffect } from "react";
import TodoHeader from "./components/TodoHeader";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import initialTodos from "./data/todos";

function AssignmentTodo() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : initialTodos;
  });

  const [inputText, setInputText] = useState('');
  const [priority, setPriority] = useState("MEDIUM");
  
  const [filter, setFilter] = useState("all");
  const [sortType, setSortType] = useState("default");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

//   const addTodo = ()=>{
//     if (inputText) {
//       let id = todos[todos.length - 1].id + 1;
//       let tmp = [...todos];
//       tmp.push({id, text: inputText, priority, done: false});
//       setTodos(tmp);
//       setInputText('');

//     }
//   }
  const handleAddTodo = () => {
    if (inputText.trim()) {
      const newTodo = { id: todos.length ? todos[todos.length - 1].id + 1 : 1, text: inputText.trim(), priority, done: false };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("todos: 변경", todos);
    return () => console.log("cleanup");
  }, []);

  

  const handleIsDone = (index) => {
    const updated = [...todos];
    updated[index - 1].done = !updated[index - 1].done;
    setTodos(updated);
  }

  
  const filterTodo = () => {
    switch (filter) {
      case 'done':
        return todos.filter(item => item.done);
        break;
      case 'notDone':
        return todos.filter(item => !item.done);
        break;
      default:
        return todos;
        break;
    }
  }
  return (
    <section>
      <TodoHeader />
      <section className="toggles">
        <TodoInput onAddTodo={handleAddTodo} />
        <section className="radios">
          <label><input type="radio" name="priority" value='HIGH' className={priority === "HIGH" ? 'selected' : null} onChange={handlePriorityChange}/>HIGH</label>
            <label><input type="radio" name="priority" value='MEDIUM' className={priority === "MEDIUM" ? 'selected' : null} onChange={handlePriorityChange}/>MEDIUM</label>
            <label><input type="radio" name="priority" value='LOW' className={priority === "LOW" ? 'selected' : null} onChange={handlePriorityChange}/>LOW</label>
            <button onClick={handleAddTodo}>추가</button>
          </section>

          <section className="filters">
            <button className={filter === "all" ? 'selected' : null} onClick={()=>setFilter('all')}>전체</button>
            <button className={filter === "done" ? 'selected' : null} onClick={()=>setFilter('done')}>완료</button>
            <button className={filter === "notDone" ? 'selected' : null} onClick={()=>setFilter('notDone')}>미완료</button>
          </section>
        </section>
        <TodoList todos={filterTodo()} onToggleDone={handleIsDone} />
    </section>
  )
}

export default AssignmentTodo;
