import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, onNavigate }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-title">Workspace</div>
      <NavLink to="/dashboard" onClick={onNavigate}>
        Dashboard
      </NavLink>
      <NavLink to="/projects" onClick={onNavigate}>
        Projects
      </NavLink>
      <NavLink to="/tasks" onClick={onNavigate}>
        My Tasks
      </NavLink>
    </aside>
  );
};

export default Sidebar;
