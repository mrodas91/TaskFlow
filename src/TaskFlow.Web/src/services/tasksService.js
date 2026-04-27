const BASE_URL = '/api/tasks';

export async function getTasks(teamId) {
  const response = await fetch(`${BASE_URL}/${teamId}`);

  if (!response.ok) {
    throw new Error(`Error al obtener tareas: ${response.status}`);
  }

  return response.json();
}

export async function createTask(title, description, teamId) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, teamId }),
  });

  if (!response.ok) {
    throw new Error(`Error al crear tarea: ${response.status}`);
  }

  return response.json();
}

export async function deleteTask(taskId)
{
  const response = await fetch(`${BASE_URL}/${taskId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Error al eliminar tarea: ${response.status}`);
  }
}

export async function changeStatusTask(taskId, newTaskStatus) {
  const response = await fetch(BASE_URL, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskId, newTaskStatus }),
  });

  if (!response.ok) {
    throw new Error(`Error al actualizar status: ${response.status}`);
  }
}