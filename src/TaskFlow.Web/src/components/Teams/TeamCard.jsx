import { useNavigate } from "react-router-dom";
import styles from './TeamCard.module.css';

export default function TeamCard({ team }) {
  const navigate = useNavigate();
  const initials = team.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={styles.card}
      onClick={() => navigate(`/teams/${team.id}/tasks`)}>
      
      <div className={styles.avatar}>{initials}</div>
      <div className={styles.info}>
        <p className={styles.name}>{team.name}</p>
        <p className={styles.id}>ID: {team.id}</p>
      </div>
    </div>
  );
}