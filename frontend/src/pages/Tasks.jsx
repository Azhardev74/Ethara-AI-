import { useEffect, useState } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";

const Tasks = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data } = await api.get("/projects");
        setProjects(data);
        if (data[0]) setSelectedProject(data[0]._id);
      } catch (err) {
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      if (!selectedProject) return;
      try {
        const { data } = await api.get(`/tasks/project/${selectedProject}`);
        setTasks(data);
      } catch (err) {
        setError("Failed to load tasks.");
      }
    };
    loadTasks();
  }, [selectedProject]);

  if (loading) return <Loader />;

  return (
    <section>
      <div className="page-head">
        <h2>Tasks</h2>
        <p>Review project tasks and quickly scan current status.</p>
      </div>
      {error && <p className="error">{error}</p>}
      {projects.length === 0 ? (
        <div className="card empty-state">
          <h3>No projects available</h3>
          <p>Create a project first, then tasks will appear here.</p>
        </div>
      ) : (
        <>
          <div className="card">
            <label htmlFor="projectSelect">Select Project</label>
            <select
              id="projectSelect"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          <div className="list-grid">
            {tasks.length === 0 ? (
              <div className="card empty-state">
                <h3>No tasks for this project</h3>
                <p>Use the project details page to create and assign new tasks.</p>
              </div>
            ) : (
              tasks.map((task) => (
                <article key={task._id} className="card">
                  <h4>{task.title}</h4>
                  <p>{task.description || "No description"}</p>
                  <small>Status: {task.status}</small>
                </article>
              ))
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Tasks;
