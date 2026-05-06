# React Learning Roadmap — TaskFlow Web

## Estado actual: Nivel JR ✅

### Conceptos ya cubiertos y dónde se aplicaron

| Concepto | Archivo(s) |
|----------|-----------|
| `useState` | `TaskCard.jsx`, `TeamsPage.jsx`, `TasksPage.jsx` |
| `useEffect` con cleanup | `TeamsPage.jsx`, `TasksPage.jsx` |
| `useParams` / `useNavigate` / `Link` | Páginas de creación y navegación |
| Componentes funcionales | Toda la app |
| Props y lifting state | `onDeleted` en `TaskList → TaskCard` |
| Fetch API + servicios separados | `teamsService.js`, `tasksService.js` |
| Routing con React Router v6 | `App.jsx` |
| Inline styles | Todos los componentes |

---

## Roadmap completo

| # | Tema | Nivel | Prioridad | Tiempo estimado | Dónde aplicarlo en TaskFlow |
|---|------|-------|-----------|-----------------|----------------------------|
| 1 | **Custom Hooks** | Mid | 🔴 Alta | 1 semana | Extraer lógica de fetch de `TeamsPage`, `TasksPage` |
| 2 | **CSS Modules / Tailwind** | Mid | 🔴 Alta | 1 semana | Reemplazar todos los inline styles |
| 3 | **Context API** | Mid | 🔴 Alta | 1-2 semanas | Estado global de usuario/equipo activo |
| 4 | **React Query (TanStack Query)** | Mid | 🔴 Alta | 2 semanas | Reemplazar fetch manual + loading/error states |
| 5 | **TypeScript** | Mid | 🟡 Media | 3-4 semanas | Migrar todo el proyecto gradualmente |
| 6 | **Manejo de errores robusto** | Mid | 🟡 Media | 3-4 días | Error boundaries, mensajes consistentes |
| 7 | **React Hook Form + Zod** | Mid | 🟡 Media | 1 semana | Formularios de creación de equipo y tarea |
| 8 | **JWT Auth** | Mid | 🟡 Media | 2 semanas | Login, proteger rutas, interceptors |
| 9 | **Axios** | Mid | 🟢 Baja | 2-3 días | Reemplazar fetch nativo, interceptors |
| 10 | **useMemo / useCallback** | Mid-Sr | 🟡 Media | 1 semana | Optimizar listas y handlers |
| 11 | **React.lazy + Suspense** | Mid-Sr | 🟢 Baja | 3-4 días | Code splitting por rutas |
| 12 | **Testing (Vitest + RTL)** | Mid-Sr | 🔴 Alta | 3-4 semanas | Tests de componentes y hooks |
| 13 | **Zustand o Redux Toolkit** | Sr | 🟡 Media | 2-3 semanas | Estado complejo si Context se complica |
| 14 | **Component Library (shadcn/ui)** | Sr | 🟢 Baja | 1 semana | Reemplazar estilos manuales por sistema de diseño |
| 15 | **Storybook** | Sr | 🟢 Baja | 1-2 semanas | Documentar componentes aislados |
| 16 | **Accesibilidad (a11y)** | Sr | 🟡 Media | Continuo | Aria labels, navegación por teclado |
| 17 | **Performance profiling** | Sr | 🟢 Baja | 1 semana | React DevTools, identificar re-renders |

---

## Plan de ejecución por fases

### Fase 1 — Mid sólido (~2 meses)
1. Custom Hooks
2. CSS Modules
3. React Hook Form + Zod
4. React Query
5. Context API

### Fase 2 — Mid avanzado (~2 meses)
6. TypeScript
7. JWT Auth
8. Testing (Vitest + RTL)
9. useMemo / useCallback

### Fase 3 — Sr (~2-3 meses)
10. Zustand
11. Accesibilidad (a11y)
12. Performance profiling
13. Storybook

---

## Notas

- **Material UI**: No es prioridad. Aprender CSS primero para no saltarse el fundamento de diseño.
- **Redux**: Casi obsoleto para proyectos nuevos. Preferir Zustand o Context + React Query.
- **Axios**: Útil principalmente por sus interceptors; no urgente si ya manejas bien fetch.

---

## Progreso

| Fase | Estado |
|------|--------|
| Fase 1 — Mid sólido | ⬜ Pendiente |
| Fase 2 — Mid avanzado | ⬜ Pendiente |
| Fase 3 — Sr | ⬜ Pendiente |

> Actualizar este archivo conforme se vayan completando los temas.
