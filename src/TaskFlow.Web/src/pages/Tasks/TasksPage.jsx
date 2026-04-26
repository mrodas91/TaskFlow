import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TaskList from '../../components/Tasks/TaskList';
import { getTasks } from '../../services/tasksService';

export default function TasksPage() {
  const { teamId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let cancelled = false;

    async function fetchTasks(){
        try {
            const data = await getTasks(teamId);
            if (!cancelled) setTasks(data);
        } catch (err) {
            if (!cancelled) setError(err.message);
        } finally {
            if (!cancelled) setLoading(false);
        }
    }

    if (teamId) {
      fetchTasks();
    } else {
      setError('Team ID no encontrado');
      setLoading(false);
    }

    return () => { cancelled = true; };
  }, [teamId]);

  return(
    <main style={styles.main}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Tasks</h1>
          <p style={styles.subtitle}>
            {loading ? '...' : `${tasks.length} task${tasks.length !== 1 ? 's' : ''} registered${tasks.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <Link to="/create" style={styles.button}>+ New Task</Link>
      </header>

      <TaskList tasks={tasks} loading={loading} error={error} />
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
    fontWeight: '600',
    color: '#1e293b',
  },
  subtitle: {
    margin: 0,
    fontSize: '15px',
    color: '#64748b',
  },
  button: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
  },
};