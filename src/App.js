import "./App.css";
import { useEffect, useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

function App() {
  const clientID = "690285709427-t6hgjjhu4blnklseb094fkvvfkcm9pvs.apps.googleusercontent.com";
  const [user, setUser] = useState(null);

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (response) => {
    setUser(response.profileObj);
  };

  const onFailure = () => {
    console.log("Error en la autenticación");
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <h1>Prueba para Login con Google</h1>
      {user ? (
        <div>
          <GoogleLogout
            clientId={clientID}
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
          />
          <h3>{user.email}</h3>
          <h3>{user.givenName}</h3>
          <h3>{user.familyName}</h3>
          <h3>{user.googleId}</h3>
          <img style={{borderRadius:"50%"}} src={user.imageUrl} alt="Imagen de perfil" />
          <h3>{user.name}</h3>
        </div>
      ) : (
        <GoogleLogin 
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_policy"} 
        />
      )}
    </div>
  );
}

export default App;
