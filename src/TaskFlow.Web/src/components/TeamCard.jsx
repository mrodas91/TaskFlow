import { useNavigate } from "react-router-dom";

export default function TeamCard({ team }) {
  const navigate = useNavigate();
  const initials = team.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div 
      style={styles.card} 
      onClick={() => navigate(`/teams/${team.id}/tasks`)}>
      
      <div style={styles.avatar}>{initials}</div>
      <div style={styles.info}>
        <p style={styles.name}>{team.name}</p>
        <p style={styles.id}>ID: {team.id}</p>
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
    cursor: 'pointer',
  },
  avatar: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '15px',
    flexShrink: 0,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  name: {
    margin: 0,
    fontSize: '15px',
    fontWeight: '600',
    color: '#1e293b',
  },
  id: {
    margin: 0,
    fontSize: '11px',
    color: '#94a3b8',
    fontFamily: 'monospace',
  },
};