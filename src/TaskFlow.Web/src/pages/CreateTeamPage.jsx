import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTeam } from '../services/teamsService';

export default function CreateTeamPage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError(null);

    try {
      await createTeam(name.trim());
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.main}>
      <Link to="/" style={styles.back}>← Volver a Equipos</Link>

      <div style={styles.card}>
        <h1 style={styles.title}>Nuevo Equipo</h1>
        <p style={styles.subtitle}>El equipo se registrará en TaskFlow de inmediato.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label} htmlFor="teamName">
            Nombre del equipo
          </label>
          <input
            id="teamName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Equipo Backend"
            disabled={loading}
            style={styles.input}
            autoFocus
          />

          {error && <p style={styles.error}>⚠ {error}</p>}

          <div style={styles.actions}>
            <Link to="/" style={styles.cancelBtn}>Cancelar</Link>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              style={{
                ...styles.submitBtn,
                opacity: loading || !name.trim() ? 0.6 : 1,
                cursor: loading || !name.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Creando...' : 'Crear Equipo'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

const styles = {
  main: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '40px 24px',
  },
  back: {
    display: 'inline-block',
    marginBottom: '24px',
    fontSize: '14px',
    color: '#3b82f6',
    textDecoration: 'none',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  },
  title: {
    margin: '0 0 6px',
    fontSize: '22px',
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    margin: '0 0 28px',
    fontSize: '14px',
    color: '#64748b',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '4px',
  },
  input: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '15px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    color: '#0f172a',
  },
  error: {
    margin: '4px 0 0',
    fontSize: '13px',
    color: '#ef4444',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '20px',
  },
  cancelBtn: {
    textDecoration: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#475569',
    backgroundColor: '#f1f5f9',
    border: '1px solid #e2e8f0',
  },
  submitBtn: {
    padding: '10px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#3b82f6',
    border: 'none',
  },
};