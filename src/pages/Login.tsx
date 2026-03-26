import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, registerUser, setCurrentUser } from '@/lib/store';
import { toast } from 'sonner';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      const user = registerUser(email, name, password);
      if (!user) { toast.error('Email already exists'); return; }
      setCurrentUser(user);
      toast.success('Account created!');
      navigate('/');
    } else {
      const user = loginUser(email, password);
      if (!user) { toast.error('Invalid credentials'); return; }
      setCurrentUser(user);
      toast.success(`Welcome back, ${user.name}!`);
      navigate(user.isAdmin ? '/admin' : '/');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-background">
      <div className="w-full max-w-md mx-4">
        <div className="bg-card rounded-lg shadow-lg border border-border p-8">
          <h1 className="font-display text-2xl font-bold text-foreground text-center mb-6">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your name" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full gold-gradient rounded-md py-2.5 text-charcoal font-semibold hover:opacity-90 transition-opacity">
              {isRegister ? 'Create Account' : 'Login'}
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => setIsRegister(!isRegister)} className="text-primary font-medium hover:underline">
              {isRegister ? 'Login' : 'Register'}
            </button>
          </p>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Admin login: admin@leahpro.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
