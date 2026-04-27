import { useState } from "react";
import { deleteTask, changeStatusTask } from "../../services/tasksService";

const STATUS_OPTIONS = [
  { value: 0, label: 'Pending' },
  { value: 1, label: 'In Progress' },
  { value: 2, label: 'Completed' },
]

const STATUS_STYLES = {
  0: { backgroundColor: '#fbbf24', color: '#fff' }, // Pending - Yellow
  1: { backgroundColor: '#3b82f6', color: '#fff' }, // In Progress - Blue
  2: { backgroundColor: '#10b981', color: '#fff' }, // Completed - Green
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

  const badge = STATUS_STYLES[status] ?? STATUS_STYLES[0];

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <p style={styles.title}>{task.title}</p>
        <button onClick={handleDelete} disabled={deleting} style={styles.deleteBtn} title="Delete task">
          {deleting ? '...' : 'X'}
        </button>
      </div>

      {/* Descripción */}
      <p style={styles.description}>{task.description}</p>

      {/* Combo de status con color semáforo */}
      <div style={styles.statusRow}>
        <span style={{ ...styles.badge, ...badge }}>
          {STATUS_OPTIONS.find((s) => s.value === status)?.label ?? 'Pending'}
        </span>
        <select
          value={status}
          onChange={handleStatusChange}
          disabled={updatingStatus}
          style={styles.select}
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

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '16px 20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '8px',
  },
  title: {
    margin: 0,
    fontSize: '15px',
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  deleteBtn: {
    border: 'none',
    background: 'transparent',
    color: '#94a3b8',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '0 4px',
    lineHeight: 1,
    transition: 'color 0.2s',
    flexShrink: 0,
  },
  description: {
    margin: 0,
    fontSize: '13px',
    color: '#64748b',
    lineHeight: '1.5',
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '4px',
  },
  badge: {
    fontSize: '11px',
    fontWeight: '600',
    padding: '3px 10px',
    borderRadius: '99px',
    border: '1px solid',
    whiteSpace: 'nowrap',
  },
  select: {
    fontSize: '13px',
    padding: '4px 8px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    color: '#374151',
    backgroundColor: '#f8fafc',
    cursor: 'pointer',
    outline: 'none',
  },
};