import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  const linkStyle = (path) => ({
    textDecoration: 'none',
    fontWeight: pathname === path ? '700' : '400',
    color: pathname === path ? '#fff' : '#cbd5e1',
    borderBottom: pathname === path ? '2px solid #60a5fa' : '2px solid transparent',
    paddingBottom: '4px',
    transition: 'color 0.2s',
  });

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>⚡ TaskFlow</span>
      <div style={styles.links}>
        <Link to="/" style={linkStyle('/')}>Equipos</Link>
        <Link to="/create" style={linkStyle('/create')}>+ Nuevo Equipo</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    height: '56px',
    backgroundColor: '#1e293b',
    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
  },
  brand: {
    color: '#f1f5f9',
    fontSize: '18px',
    fontWeight: '700',
    letterSpacing: '-0.3px',
  },
  links: {
    display: 'flex',
    gap: '28px',
    fontSize: '14px',
  },
};