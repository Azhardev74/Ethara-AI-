import { useEffect, useState } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await api.get("/tasks/dashboard/summary");
        setSummary(data);
      } catch (error) {
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return <Loader />;
  if (!summary) return <p className="error">Unable to load dashboard.</p>;

  return (
    <section>
      <div className="page-head">
        <h2>Dashboard</h2>
        <p>Track your assigned workload and progress at a glance.</p>
      </div>
      <div className="stats-grid">
        <div className="card stat">
          <h3>{summary.totalAssigned}</h3>
          <p>Total Assigned Tasks</p>
        </div>
        <div className="card stat">
          <h3>{summary.byStatus.Todo}</h3>
          <p>Todo</p>
        </div>
        <div className="card stat">
          <h3>{summary.byStatus["In Progress"]}</h3>
          <p>In Progress</p>
        </div>
        <div className="card stat">
          <h3>{summary.byStatus.Done}</h3>
          <p>Done</p>
        </div>
        <div className="card stat overdue">
          <h3>{summary.overdue}</h3>
          <p>Overdue</p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
