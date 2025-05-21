import { faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../services/authservice";
import './AuthForm.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const objetuser = { email, password };

    signin(objetuser)
      .then((result) => {
        console.log(result.data);

        if (result.data.success) {
          const { user, token, refreshToken } = result.data;

          if (user.isActive) {
            localStorage.setItem("CC_Token", token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("refresh_token", refreshToken);

            if (user.role == "admin") navigate('/dashboard');
            else navigate('/');
          } else {
            setErrorMessage("Compte n'est pas encore activé");
          }
        } else {
          setErrorMessage("Erreur !");
        }
      })
      .catch((error) => {
        console.error(error);
        const msg = error?.response?.data?.message || "Erreur inconnue lors de la connexion.";
        setErrorMessage(msg);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Login</h2>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="input-group">
            <div className="input-label">Email</div>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-label">Password</div>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faLock} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer', marginLeft: '8px', color: '#555' }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>

          <button className="button" type="submit">Log In</button>
        </form>

        <Link to="/register">
          {"Don't have an account? Sign Up"}
        </Link>
      </div>
    </div>
  );
};

export default Login;

















/*import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../services/authservice";

import { faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './AuthForm.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const objetuser = {
      email: email,
      password: password
    };

    signin(objetuser)
      .then((result) => {
        console.log(result.data.success);
        console.log(result.data.user);

        if (result.data.success) {
          if (result.data.user.isActive) {
            localStorage.setItem("CC_Token", result.data.token);
            localStorage.setItem("user", JSON.stringify(result.data.user));
            localStorage.setItem("refresh_token", result.data.refreshToken);

            if (result.data.user.role === "admin") navigate('/menu');
            else navigate('/client');
          } else {
            setErrorMessage("Compte n'est pas encore activé");
          }
        } else {
          setErrorMessage("Erreur !");
        }
      })
      .catch((error) => {
        console.error(error);
        const msg = error?.response?.data?.message || "Erreur inconnue lors de la connexion.";
        setErrorMessage(msg);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Login</h2>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="input-group">
            <div className="input-label">Email</div>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-label">Password</div>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faLock} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer', marginLeft: '8px', color: '#555' }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>

          <button className="button" type="submit">Log In</button>
        </form>

        <Link href="#" to="/register">
          {"Don't have an account? Sign Up"}
        </Link>
      </div>
    </div>
  );
};

export default Login;





/*import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../services/authservice";

import './AuthForm.css';

const Login = () => {
  const navigate = useNavigate();
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fonction pour traduire les messages d'erreur du backend
  const translateError = (msg) => {
    if (msg === "Account doesn't exist !") return "Compte introuvable !";
    if (msg === "Invalid credentials !") return "Email ou mot de passe incorrect !";
    if (msg === "All fields are required !") return "Tous les champs sont requis !";
    return msg || "Erreur inconnue !";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const objetuser = {
      email: email,
      password: password
    }; 

    signin(objetuser)
      .then((result) => {
        if (result.data.success) {
          if (result.data.user.isActive) {
            localStorage.setItem("CC_Token", result.data.token);
            localStorage.setItem("user", JSON.stringify(result.data.user));
            localStorage.setItem("refresh_token", result.data.refreshToken);

            if (result.data.user.role === "admin") navigate('/menu');
            else navigate('/client');
          } else {
            alert("Compte n'est pas encore activé.");
          }
        } else {
          alert(translateError(result.data.message));
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          alert(translateError(error.response.data.message));
        } else {
          alert("Erreur réseau ou inconnue.");
        }
        console.error(error);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Login</h2>

          <div className="input-group">
            <div className="input-label">Email</div>
            <div className="input-wrapper">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-label">Password</div>
            <div className="input-wrapper">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="button" type="submit">Log In</button>
        </form>

        <Link to="/register">
          {"Don't have an account? Sign Up"}
        </Link>
      </div>
    </div>
  );
};

export default Login;

//import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../services/authservice";

import './AuthForm.css';

const Login = () => {

  const navigate = useNavigate();
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
const handleSubmit=(event)=>{
event.preventDefault();

const objetuser = {
email: email,
password :password
}; 

signin(objetuser).then((result)=>{
    
  console.log(result.data.success)
  console.log(result.data.token)
  console.log(result.data.user)

    if (result.data.success){
    if(result.data.user.isActive){
     localStorage.setItem("CC_Token",result.data.token)
     localStorage.setItem("user",JSON.stringify(result.data.user))
     localStorage.setItem("refresh_token",result.data.refreshToken)
     if (result.data.user.role==="admin") navigate('/menu')
     else navigate('/client')
     }
     else alert ("Compte n'est pas encore activé")
    }    
    else alert("Erreur ! ")

})
.catch((error)=>{alert("Error");console.log(error)})
};

  return (
    <div className="auth-container">
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <div className="input-group">
          <div className="input-label">Email</div>
          <div className="input-wrapper">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="input-group">
        <div className="input-label">Password</div>
          <div className="input-wrapper">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button className="button" type="submit">Log In</button>
      </form>
      
      <Link href="#" to="/register">
                  {"Don't have an account? Sign Up"}
      </Link>

    </div>
    </div>
  );
};

export default Login;*/