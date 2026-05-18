import { useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([
    {id: 1, text: '과제하기', done: false, priority:'HIGH'},
    {id: 2, text: '공부하기', done: false, priority:'MEDIUM'},
    {id: 3, text: '책읽기', done: false, priority:'LOW'},
  ])
  const handleIsDone = (index) => {
    const updated = [...todos];
    updated[index - 1].done = !updated[index - 1].done;
    setTodos(updated);
  }
  const [input, setInput] = useState('')
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const [priority, setPriority] = useState("MEDIUM");
  const [filter, setFilter] = useState("all");
  const addTodo = ()=>{
    if (input) {
      let id = todos[todos.length - 1].id + 1;
      let tmp = [...todos];
      tmp.push({id, text: input, priority, done: false});
      console.log(id);
      console.log(tmp);
      setTodos(tmp);
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
    <div>
        <h2>To Do List</h2>
        <input id="newTask" type="text" placeholder="할 일을 입력하세요." value={input} onChange={handleInputChange} onKeyDown={(e)=>{if(e.key == 'Enter') addTodo();}}></input>
        <label><input type="radio" name="priority" value='HIGH' className={priority === "HIGH" ? 'selected' : null} onChange={(e) => setPriority(e.target.value)}/>HIGH</label>
        <label><input type="radio" name="priority" value='MEDIUM' className={priority === "MEDIUM" ? 'selected' : null} onChange={(e) => setPriority(e.target.value)}/>MEDIUM</label>
        <label><input type="radio" name="priority" value='LOW' className={priority === "LOW" ? 'selected' : null} onChange={(e) => setPriority(e.target.value)}/>LOW</label>
        <button onClick={addTodo}>추가</button>

        <section className="filters">
          <button className={filter === "all" ? 'selected' : null} onClick={()=>setFilter('all')}>전체</button>
          <button className={filter === "done" ? 'selected' : null} onClick={()=>setFilter('done')}>완료</button>
          <button className={filter === "notDone" ? 'selected' : null} onClick={()=>setFilter('notDone')}>미완료</button>
        </section>
        <ul>
            {filterTodo().map(item => (
                <li key={item.id} onClick={() => handleIsDone(item.id)}><span className={item.priority}>{item.priority}</span> {item.text} {item.done ? '✅' : '📝'}</li>
            ))}
        </ul>
    </div>
  )
}

export default Todo;
