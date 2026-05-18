import { useState, useEffect } from "react";

function Todo({ todos, onTodoClick, onAddTodo }) {
//   const [todos, setTodos] = useState(() => {
//     const savedTodos = localStorage.getItem("todos");
//     return savedTodos ? JSON.parse(savedTodos) : [
//       {id: 1, text: '과제하기', done: false, priority:'HIGH'},
//       {id: 2, text: '공부하기', done: false, priority:'MEDIUM'},
//       {id: 3, text: '책읽기', done: false, priority:'LOW'},
//     ];
//   });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("todos: ", todos);
    // return () => console.log("cleanup");
  }, [todos]);

  const handleIsDone = (index) => {
    const updated = [...todos];
    updated[index - 1].done = !updated[index - 1].done;
    onTodoClick(updated[index - 1].id);
  }
  const [input, setInput] = useState('')
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const [priority, setPriority] = useState("MEDIUM");
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };
  const [filter, setFilter] = useState("all");
  const addTodo = ()=>{
    if (input) {
      let id = todos[todos.length - 1].id + 1;
      let tmp = [...todos];
      tmp.push({id, text: input, priority, done: false});
      onAddTodo(tmp[tmp.length - 1]);
      setInput('');

    }
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
        <section className="toggles">
          <input id="newTask" type="text" placeholder="할 일을 입력하세요." value={input} onChange={handleInputChange} onKeyDown={(e)=>{if(e.key == 'Enter') addTodo();}}></input>
          <section className="radios">
            <label><input type="radio" name="priority" value='HIGH' className={priority === "HIGH" ? 'selected' : null} onChange={handlePriorityChange}/>HIGH</label>
            <label><input type="radio" name="priority" value='MEDIUM' className={priority === "MEDIUM" ? 'selected' : null} onChange={handlePriorityChange}/>MEDIUM</label>
            <label><input type="radio" name="priority" value='LOW' className={priority === "LOW" ? 'selected' : null} onChange={handlePriorityChange}/>LOW</label>
            <button onClick={addTodo}>추가</button>
          </section>

          <section className="filters">
            <button className={filter === "all" ? 'selected' : null} onClick={()=>setFilter('all')}>전체</button>
            <button className={filter === "done" ? 'selected' : null} onClick={()=>setFilter('done')}>완료</button>
            <button className={filter === "notDone" ? 'selected' : null} onClick={()=>setFilter('notDone')}>미완료</button>
          </section>
        </section>
        <ul>
            {filterTodo().map(item => (
                <li key={item.id} onClick={() => handleIsDone(item.id)} className={item.done? 'selected' : null}><span className={item.priority}>{item.priority}</span><span>{item.done ? '✅' : '📝'}</span><span className="item-text">{item.text}</span></li>
            ))}
        </ul>
    </section>
  )
}

export default Todo;
