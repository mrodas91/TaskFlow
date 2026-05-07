import { useState } from "react";
import { deleteTask, changeStatusTask } from "../../services/tasksService";
import styles from './TaskCard.module.css';

const STATUS_OPTIONS = [
  { value: 0, label: 'Pending' },
  { value: 1, label: 'In Progress' },
  { value: 2, label: 'Completed' },
];

const statusClassMap = {
  0: styles.pending,
  1: styles.inProgress,
  2: styles.completed,
};

export default function TaskCard({ task, onDeleted }) {

  const [status, setStatus] = useState(task.status);
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  async function handleDelete() {
    if (!confirm(`¿Eliminar la tarea "${task.title}"?`)) return;

    setDeleting(true);
    try {
      await deleteTask(task.id);
      onDeleted(task.id);
    } catch (err) {
      alert(err.message);
      setDeleting(false);
    }
  }

  async function handleStatusChange(e) {
    const newStatus = Number(e.target.value);
    setUpdatingStatus(true);
    try {
      await changeStatusTask(task.id, newStatus);
      setStatus(newStatus);
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingStatus(false);
    }
  }

  const badgeClassName = `${styles.badge} ${statusClassMap[status] ?? styles.pending}`;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className={styles.title}>{task.title}</p>
        <button onClick={handleDelete} disabled={deleting} className={styles.deleteBtn} title="Delete task">
          {deleting ? '...' : 'X'}
        </button>
      </div>

      {/* Descripción */}
      <p className={styles.description}>{task.description}</p>

      {/* Combo de status con color semáforo */}
      <div className={styles.statusRow}>
        <span className={badgeClassName}>
            {STATUS_OPTIONS.find((s) => s.value === status)?.label ?? 'Pending'}
        </span>
        <select
          value={status}
          onChange={handleStatusChange}
          disabled={updatingStatus}
          className={styles.select}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
