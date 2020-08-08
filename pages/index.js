import React from 'react'
import { AuthToken } from '../services/auth_token'

function Home() {
  const [error, setError] = React.useState('');
  const stateKey = 'spotify_auth_state';
  const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  React.useEffect(() => {
    const parsedHash = getHashParams()
    if (Object.keys(parsedHash).length > 0) {
      const { access_token, state } = parsedHash;
      const storedState = localStorage.getItem(stateKey);
      if (access_token && (state == null || state !== storedState)) {
        setError('There was an error during the authentication');
      } else {
        if (access_token) {
          AuthToken.storeToken(access_token)
        } else {
          setError('There was an error during the authentication');
        }
      }
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const client_id = '67d4efb7834841ae805a11038a84eba5';
    const redirect_uri = 'http://localhost:3000/';

    const state = generateRandomString(16);

    localStorage.setItem(stateKey, state);
    const scope = 'user-read-private user-read-email';

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location = url;
  };

  return (
    <main>
      <div className="limiter">
        <div className="container-login100" style={{
          backgroundImage: `url('/static/images/bg-01.jpg')`
        }}>
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <span className="login100-form-title p-b-49">
              Spotify Album
					</span>
            <form className="login100-form validate-form" onSubmit={handleSubmit}>
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button type="submit" className="login100-form-btn">
                    <span style={{ fontSize: 28 }}>
                      <i className="fa fa-spotify"></i>
                    </span>&nbsp;&nbsp;Login Using Spotify
							</button>
                </div>
                {!!error && <div className="wrap-input100 error">
                  {error}
                </div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home;
