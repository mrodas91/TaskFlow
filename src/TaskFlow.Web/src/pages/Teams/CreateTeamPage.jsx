import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTeam } from '../../services/teamsService';
import pagesStyles from './CreateTeamPage.module.css';
import formStyles from '../../styles/forms.module.css';

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

  const isSubmitDisabled = loading || !name.trim();

  return (
    <main className={pagesStyles.main}>
      <Link to="/" className={pagesStyles.back}>← Volver a Equipos</Link>

      <div className={pagesStyles.card}>
        <h1 className={pagesStyles.title}>Nuevo Equipo</h1>
        <p className={pagesStyles.subtitle}>El equipo se registrará en TaskFlow de inmediato.</p>

        <form onSubmit={handleSubmit} className={formStyles.form}>
          <label className={formStyles.label} htmlFor="teamName">
            Nombre
          </label>
          <input
            id="teamName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Equipo Backend"
            disabled={loading}
            className={formStyles.input}
            autoFocus
          />

          {error && <p className={formStyles.error}>⚠ {error}</p>}

          <div className={formStyles.actions}>
            <Link to="/" className={formStyles.secondaryButton}>
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={isSubmitDisabled ? `${formStyles.primaryButton} ${formStyles.buttonDisabled}` : formStyles.primaryButton}
            >
              {loading ? 'Creando...' : 'Crear Equipo'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
