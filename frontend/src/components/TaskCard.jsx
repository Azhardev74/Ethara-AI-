import dayjs from "dayjs";

const TaskCard = ({ task, onStatusChange, onDelete, canDelete }) => {
  const isOverdue = task.dueDate && dayjs(task.dueDate).isBefore(dayjs()) && task.status !== "Done";

  return (
    <div className="card task-card">
      <div className="task-head">
        <h4>{task.title}</h4>
        <span className={`status status-${task.status.replace(" ", "-").toLowerCase()}`}>
          {task.status}
        </span>
      </div>
      <p>{task.description || "No description provided."}</p>
      <small>
        Assigned to: {task.assignedTo?.name || "Unknown"} | Due:{" "}
        {task.dueDate ? dayjs(task.dueDate).format("DD MMM YYYY") : "N/A"}
      </small>
      {isOverdue && <div className="pill-overdue">Overdue</div>}
      <div className="task-actions">
        <select value={task.status} onChange={(e) => onStatusChange(task._id, e.target.value)}>
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        {canDelete && (
          <button className="btn-danger" onClick={() => onDelete(task._id)} aria-label="Delete task">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
