import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TeamsPage from './pages/TeamsPage';
import CreateTeamPage from './pages/CreateTeamPage';
import TasksPage from './pages/Tasks/TasksPage';
import CreateTaskPage from './pages/Tasks/CreateTaskPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TeamsPage />} />
        <Route path="/create" element={<CreateTeamPage />} />
        <Route path="/teams/:teamId/tasks" element={<TasksPage />} />
        <Route path="/teams/:teamId/tasks/create" element={<CreateTaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}