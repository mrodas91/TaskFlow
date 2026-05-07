import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TaskList from '../../components/Tasks/TaskList';
import { useFetch } from '../../hooks/useFetch';
import { getTasks } from '../../services/tasksService';

export default function TasksPage() {
  const { teamId } = useParams();
  const [deletedTaskIds, setDeletedTaskIds] = useState([]);
  const { data: tasks, loading, error } = useFetch(async () => {
    if (!teamId) {
      throw new Error('Team ID no encontrado');
    }

    return getTasks(teamId);
  }, [teamId]);

  useEffect(() => {
    setDeletedTaskIds([]);
  }, [teamId]);

  const visibleTasks = tasks.filter((task) => !deletedTaskIds.includes(task.id));

  function handleDeleted(taskId) {
    setDeletedTaskIds((prev) => [...prev, taskId]);
  }

  return(
    <main style={styles.main}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Tasks</h1>
          <p style={styles.subtitle}>
            {loading ? '...' : `${visibleTasks.length} task${visibleTasks.length !== 1 ? 's' : ''} registered${visibleTasks.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <Link to={`/teams/${teamId}/tasks/create`} style={styles.button}>+ New Task</Link>
      </header>

      <TaskList tasks={visibleTasks} loading={loading} error={error} onDeleted={handleDeleted}/>
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
