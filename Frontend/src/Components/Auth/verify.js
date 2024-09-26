import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/send-verification-email'); // Le lien pour envoyer l'email
      if (response.status === 200) {
        setEmailSent(true);
      }
    } catch (error) {
      setError("Erreur lors de l'envoi de l'email de vérification.");
    }
  };

  return (
    <div className="verify-email-container">
      <h2>Vérifier votre adresse email</h2>
      {emailSent ? (
        <p>Un email de vérification a été envoyé. Veuillez vérifier votre boîte de réception.</p>
      ) : (
        <button onClick={handleVerifyEmail}>Vérifier votre email</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => navigate("/login")}>Aller à la page de connexion</button>
    </div>
  );
}

export default VerifyEmail;
