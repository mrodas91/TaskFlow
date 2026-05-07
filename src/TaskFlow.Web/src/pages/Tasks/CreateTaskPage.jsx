import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { createTask } from "../../services/tasksService";
import pagesStyles from './CreateTaskPage.module.css';
import formStyles from '../../styles/forms.module.css';

export default function CreateTaskPage() {
    const { teamId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        setError(null);

        try {
            await createTask(title.trim(), description.trim(), teamId);
            navigate(`/teams/${teamId}/tasks`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const isSubmitDisabled = loading || !name.trim();

    return (
        <main className={pagesStyles.main}>
          <Link to={`/teams/${teamId}/tasks`} className={pagesStyles.back}>← Back to Task</Link>
    
          <div className={formStyles.card}>
            <h1 className={formStyles.title}>New Task</h1>
            <p className={formStyles.subtitle}>A new task will be added</p>
    
            <form onSubmit={handleSubmit} className={formStyles.form}>
                <label className={formStyles.label} htmlFor="taskTitle"> Name </label>
                <input
                    id="taskTitle"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej. Implementar login"
                    disabled={loading}
                    className={formStyles.input}
                    autoFocus
                /> 

                <label className={formStyles.label} htmlFor="taskDescription"> Description </label>
                <textarea
                    id="taskDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task details and information"
                    disabled={loading}
                    className={formStyles.input}
                    style={{ height: '100px', resize: 'vertical' }}
                />
    
              {error && <p className={formStyles.error}>⚠ {error}</p>}
    
              <div className={formStyles.actions}>
                <Link to={`/teams/${teamId}/tasks`} className={formStyles.secondaryButton}>Cancelar</Link>
                <button
                  type="submit"
                  disabled={loading || !title.trim() || !description.trim()}
                  className={isSubmitDisabled ? `${formStyles.primaryButton} ${formStyles.primaryButton}` : formStyles.primaryButton}
                >
                  {loading ? 'Adding...' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
        </main>
      );
    }
