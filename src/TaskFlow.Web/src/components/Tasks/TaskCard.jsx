export default function TaskCard({ task }) {  
  return (
    <div style={styles.card}>
      <div style={styles.info}>
        <p style={styles.title}>{task.title}</p>
        <p style={styles.description}>{task.description}</p>
        <p style={styles.status}>Status: {task.status}</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '16px 20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  title: {
    margin: 0,
    fontSize: '15px',
    fontWeight: '600',
    color: '#1e293b',
  },
  description: {
    margin: 0,
    fontSize: '13px',
    color: '#64748b',
  },
  status: {
    margin: 0,
    fontSize: '12px',
    color: '#94a3b8',
  },
};