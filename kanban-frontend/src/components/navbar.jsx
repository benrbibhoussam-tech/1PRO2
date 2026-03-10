import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/dashboard">Tableaux</Link>
      <Link to="/login">Se connecter</Link>
      <Link to="/signup">S'inscrire</Link>
    </nav>
  );
};

export default Navbar;