import useAuth from "../hooks/useAuth";

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="btn-icon menu-btn" onClick={onToggleSidebar} aria-label="Open menu">
          ☰
        </button>
        <h1>Team Task Manager</h1>
      </div>
      <div className="navbar-right">
        <span className="user-chip">{user?.name}</span>
        <button className="btn-secondary" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
