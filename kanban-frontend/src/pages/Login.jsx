import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Persistance de session : on stocke un faux token
      localStorage.setItem('token', 'fake-jwt-token-123');
      localStorage.setItem('currentUser', email);
      navigate('/dashboard');
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="container">
      <h2>Connexion <i className="fa-solid fa-lock"></i></h2>
      <form onSubmit={handleLogin}>
        <div className="input-wrapper">
          <input 
            type="email" placeholder="Email" required 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper" style={{ marginTop: '10px' }}>
          <input 
            type="password" placeholder="Mot de passe" required 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        <button type="submit" className="add-col-btn" style={{ width: '100%', marginTop: '20px' }}>Se connecter</button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Pas de compte ? <Link to="/signup" style={{ color: 'var(--accent-color)' }}>S'inscrire</Link>
      </p>
    </div>
  );
};

export default Login;