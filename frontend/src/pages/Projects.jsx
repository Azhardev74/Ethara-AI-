import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    try {
      const { data } = await api.get("/projects");
      setProjects(data);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.post("/projects", form);
      setForm({ name: "", description: "" });
      loadProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <section>
      <div className="page-head">
        <h2>Projects</h2>
        <p>Create projects and keep your team aligned around clear goals.</p>
      </div>
      <form className="card form-grid" onSubmit={createProject}>
        <h3>Create New Project</h3>
        <input
          placeholder="Project name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button disabled={saving}>{saving ? "Creating..." : "Create Project"}</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="list-grid">
        {projects.length === 0 ? (
          <div className="card empty-state">
            <h3>No projects yet</h3>
            <p>Create your first project to start assigning tasks.</p>
          </div>
        ) : (
          projects.map((project) => (
            <Link className="card project-item" key={project._id} to={`/projects/${project._id}`}>
              <h3>{project.name}</h3>
              <p>{project.description || "No description"}</p>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default Projects;
