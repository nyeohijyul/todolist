import CreatedAt from "./Createdat";
import Priority from "./Priority";

function TodoItem({ text, priority, createdAt }) {
  return <li>
    <Priority priority={priority} />
    <span>{text}</span>
    <br />
    <CreatedAt createdAt={createdAt} />
    </li>;
}

export default TodoItem;