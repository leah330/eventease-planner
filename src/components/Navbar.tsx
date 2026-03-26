import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { getCurrentUser, setCurrentUser } from '@/lib/store';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const user = getCurrentUser();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/book', label: 'Book Event' },
    { to: '/packages', label: 'Packages' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    setCurrentUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="LeahPro Events" className="h-10 w-10 object-contain" />
          <span className="font-display text-xl font-semibold text-foreground">LeahPro <span className="text-primary">Events</span></span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive(l.to) ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {l.label}
            </Link>
          ))}
          {user?.isAdmin && (
            <Link to="/admin" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/admin') ? 'text-primary' : 'text-muted-foreground'}`}>
              Admin
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/my-bookings" className="text-sm font-medium text-muted-foreground hover:text-primary">My Bookings</Link>
              <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-2">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={`block py-2 text-sm font-medium ${isActive(l.to) ? 'text-primary' : 'text-muted-foreground'}`}>
              {l.label}
            </Link>
          ))}
          {user?.isAdmin && (
            <Link to="/admin" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-muted-foreground">Admin</Link>
          )}
          {user ? (
            <>
              <Link to="/my-bookings" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-muted-foreground">My Bookings</Link>
              <button onClick={handleLogout} className="block py-2 text-sm font-medium text-destructive">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-primary">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
