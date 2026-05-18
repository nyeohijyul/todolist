import { NavLink } from "react-router-dom";
function Navigation() {
  return (
    <nav>
      <NavLink to="/todos" className={({isActive})=>isActive ? 'selected' : ''}>전체</NavLink>
      <NavLink to="/completed" className={({isActive})=>isActive ? 'selected' : ''}>완료</NavLink>
      <NavLink to="/active" className={({isActive})=>isActive ? 'selected' : ''}>미완료</NavLink>
      <NavLink to="/api" className={({isActive})=>isActive ? 'selected' : ''}>API 시도</NavLink>
    </nav>
  );
}
export default Navigation;