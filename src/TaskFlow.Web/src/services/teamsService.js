const BASE_URL = '/api/teams';

/**
 * GET /api/teams
 * @returns {Promise<Array<{id: string, name: string}>>}
 */
export async function getTeams() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error(`Error al obtener equipos: ${response.status}`);
  }

  return response.json();
}

/**
 * POST /api/teams
 * @param {string} name
 * @returns {Promise<string>} - GUID del nuevo equipo
 */
export async function createTeam(name) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error(`Error al crear equipo: ${response.status}`);
  }

  return response.json();
}