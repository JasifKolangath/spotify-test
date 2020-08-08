import React from 'react';
import { AuthToken } from '../services/auth_token';
import { useRouter } from 'next/router';
import { getData } from '../services/rest_service';
import AlbumCard from '../components/album-card';
import ErrorPopup from '../components/error-puopup';
import FormPopup from '../components/form-popup';

const Album = () => {
  const router = useRouter();
  const [userData, setUserData] = React.useState({})
  const [albums, setAlbums] = React.useState([])
  const [error, setError] = React.useState(null)
  const [selectedAlbum, setSelectedAlbum] = React.useState(undefined)

  React.useEffect(() => {
    const accessToken = AuthToken.getToken();
    if (!accessToken) {
      router.replace('/');
      return;
    }
    getUserDetail()
    getAlbumList()
  }, []);

  const getUserDetail = async () => {
    try {
      const data = await getData('https://api.spotify.com/v1/me');
      console.log("asd", { data })
      if (data && data.status) {
        if (data.status == 401) {
          setError('Your session has been expired. Please login again!')
        } else if (data.status >= 300) {
          setError('Something unexpected happened. Please login again!')
        }
      }
      if (data.id) {
        setUserData(data)
      }
    } catch (error) {
      console.log({ error })
      setError('Something unexpected happened. Please login again!')
    }
  }

  const getAlbumList = async () => {
    try {
      const data = await getData('https://api.spotify.com/v1/browse/new-releases?country=IN&limit=12&offset=5');
      if (data.albums && Array.isArray(data.albums.items)) {
        setAlbums(data.albums.items);
      }
    } catch (error) {
      setError('Something unexpected happened. Please login again!')
    }
  }

  const logout = () => {
    AuthToken.clearToken()
  }

  React.useEffect(() => {
    if (!!error) {
      document.getElementById('ErrorPopupShowBtn').click()
    }
  }, [error]);

  React.useEffect(() => {
    if (!!selectedAlbum) {
      document.getElementById('FormPopupShowBtn').click()
    }
  }, [selectedAlbum]);

  return (<>
    <header>
      <div className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container d-flex justify-content-between">
          <a href="/album" className="navbar-brand d-flex align-items-center">
            <span style={{ fontSize: 28 }}>
              <i className="fa fa-spotify"></i>
            </span>&nbsp;&nbsp;
            <strong>Spotify Album</strong>
          </a>
          <button className="navbar-toggler" type="button" onClick={logout}>
            <span style={{ fontSize: 28 }}>
              <i className="fa fa-sign-out"></i>
            </span>
          </button>
        </div>
      </div>
    </header>

    <main role="main">

      <section className="jumbotron text-center">
        <div className="container">
          {Array.isArray(userData.images) && userData.images.length > 0 && <a href={userData.external_urls.spotify} alt={userData.display_name} target="_blank"><img className="d-block mx-auto mb-4 rounded-circle" src={userData.images[0].url} alt="" width="120" height="120" /></a>}
          <a href={userData.external_urls?.spotify} alt={userData.display_name} target="_blank"><h1>{userData.display_name}</h1></a>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="py-5 text-center">
            <h2>New Releases</h2>
          </div>
          <div className="row">
            {albums.map((album, index) => <AlbumCard key={`${album.id}-${index}`} name={album.name} image={album.images[1].url} url={album.external_urls.spotify} artists={album.artists} onClick={() => {
              setSelectedAlbum(album)
            }} />)}
          </div>
        </div>
      </div>

    </main>

    <footer className="text-muted">
      <div className="container text-center">
        <p>Thanks</p>
      </div>
    </footer>
    {error && <ErrorPopup message={error} onClick={logout} />}
    {selectedAlbum && <FormPopup albumName={selectedAlbum.name} onClose={() => setSelectedAlbum(undefined)} />}
  </>
  );
}

export default Album;
