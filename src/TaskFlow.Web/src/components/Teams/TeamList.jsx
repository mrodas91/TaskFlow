import TeamCard from './TeamCard';

export default function TeamList({ teams, loading, error }) {
  if (loading) {
    return <p style={styles.message}>Cargando equipos...</p>;
  }

  if (error) {
    return <p style={{ ...styles.message, color: '#ef4444' }}>⚠ {error}</p>;
  }

  if (teams.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyTitle}>No hay equipos todavía</p>
        <p style={styles.emptyHint}>Crea el primero desde "Nuevo Equipo".</p>
      </div>
    );
  }

  return (
    <div style={styles.grid}>
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
  },
  message: {
    color: '#64748b',
    fontSize: '15px',
    textAlign: 'center',
    marginTop: '48px',
  },
  empty: {
    textAlign: 'center',
    marginTop: '64px',
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#475569',
    margin: '0 0 8px',
  },
  emptyHint: {
    fontSize: '14px',
    color: '#94a3b8',
    margin: 0,
  },
};