import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import TaskCard from "../components/TaskCard";

const ProjectDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [memberForm, setMemberForm] = useState({ email: "", role: "Member" });
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    status: "Todo"
  });

  const myRole = useMemo(() => {
    if (!project || !user) return "Member";
    const me = project.members.find((m) => m.user._id === user._id);
    return me?.role || "Member";
  }, [project, user]);

  const loadData = async () => {
    try {
      const [projectRes, taskRes] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/tasks/project/${id}`)
      ]);
      setProject(projectRes.data);
      setTasks(taskRes.data);
    } catch (err) {
      setError("Failed to load project details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const addMember = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/projects/${id}/members`, memberForm);
      setMemberForm({ email: "", role: "Member" });
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add member");
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks", { ...taskForm, projectId: id });
      setTaskForm({ title: "", description: "", assignedTo: "", dueDate: "", status: "Todo" });
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await api.put(`/tasks/${taskId}`, { status });
      setTasks((prev) => prev.map((task) => (task._id === taskId ? { ...task, status } : task)));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  if (loading) return <Loader />;
  if (!project) return <p className="error">Project not found.</p>;

  return (
    <section>
      <div className="page-head">
        <h2>{project.name}</h2>
        <p>{project.description || "No description added yet."}</p>
      </div>
      {error && <p className="error">{error}</p>}

      <div className="card">
        <h3>Team Members</h3>
        <ul className="member-list">
          {project.members.map((member) => (
            <li key={member.user._id}>
              {member.user.name} ({member.user.email}) - <strong>{member.role}</strong>
            </li>
          ))}
        </ul>
        {myRole === "Admin" && (
          <form className="inline-form" onSubmit={addMember}>
            <input
              type="email"
              placeholder="Member email"
              value={memberForm.email}
              onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
              required
            />
            <select
              value={memberForm.role}
              onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
            >
              <option>Member</option>
              <option>Admin</option>
            </select>
            <button>Add Member</button>
          </form>
        )}
      </div>

      <form className="card form-grid" onSubmit={createTask}>
        <h3>Create Task</h3>
        <input
          placeholder="Task title"
          value={taskForm.title}
          onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={taskForm.description}
          onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
        />
        <select
          value={taskForm.assignedTo}
          onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })}
          required
        >
          <option value="">Assign to</option>
          {project.members.map((member) => (
            <option key={member.user._id} value={member.user._id}>
              {member.user.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={taskForm.dueDate}
          onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
        />
        <button>Create Task</button>
      </form>

      <div className="list-grid">
        {tasks.length === 0 ? (
          <div className="card empty-state">
            <h3>No tasks yet</h3>
            <p>Create a task and assign it to a teammate to get started.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusChange={updateStatus}
              onDelete={deleteTask}
              canDelete={myRole === "Admin"}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default ProjectDetails;
