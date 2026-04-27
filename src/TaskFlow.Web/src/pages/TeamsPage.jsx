import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TeamList from '../components/TeamList';
import { getTeams } from '../services/teamsService';

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchTeams() {
      try {
        const data = await getTeams();
        if (!cancelled) setTeams(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchTeams();
    return () => { cancelled = true; };
  }, []);

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Equipos</h1>
          <p style={styles.subtitle}>
            {loading ? '...' : `${teams.length} equipo${teams.length !== 1 ? 's' : ''} registrado${teams.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <Link to="/create" style={styles.button}>+ Nuevo Equipo</Link>
      </header>

      <TeamList teams={teams} loading={loading} error={error} />
    </main>
  );
}

const styles = {
  main: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
  },
  title: {
    margin: '0 0 4px',
    fontSize: '26px',
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    margin: 0,
    fontSize: '14px',
    color: '#64748b',
  },
  button: {
    textDecoration: 'none',
    backgroundColor: '#3b82f6',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
  },
};