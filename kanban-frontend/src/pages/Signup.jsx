import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style.css'; 

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    // Simulation d'enregistrement local
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === formData.email)) {
      setError("Cet email est déjà utilisé");
      return;
    }

    users.push({ email: formData.email, password: formData.password });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert("Compte créé avec succès ! Redirection...");
    navigate('/'); // Redirection vers Login
  };

  return (
    <div className="container">
      <h2>Inscription <i className="fa-solid fa-user-plus"></i></h2>
      <form onSubmit={handleSignup}>
        <div className="input-wrapper">
          <input 
            type="email" placeholder="Email" required 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="input-wrapper" style={{ marginTop: '10px' }}>
          <input 
            type="password" placeholder="Mot de passe" required 
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>
        <div className="input-wrapper" style={{ marginTop: '10px' }}>
          <input 
            type="password" placeholder="Confirmer" required 
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          />
        </div>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        <button type="submit" className="add-col-btn" style={{ width: '100%', marginTop: '20px' }}>Créer mon compte</button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Déjà un compte ? <Link to="/" style={{ color: 'var(--accent-color)' }}>Se connecter</Link>
      </p>
    </div>
  );
};

export default Signup;