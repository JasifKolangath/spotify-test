const Album = ({ name, image, url, artists, onClick }) => {
  return (<div className="col-md-4">
    <div className="card mb-4 shadow-sm" style={{ cursor: 'pointer' }} onClick={onClick}>
      <img className="d-block" src={image} alt={name} height="300" style={{ objectFit: 'cover' }} />
      <div className="card-body">
        <a href={url} target="_blank"><strong><h6 className="">{name}</h6></strong></a>
        <div className="d-flex align-items-left">
          <p className="text-muted">{artists.reduce((acc, val) => `${acc ? acc + ', ' : ''} ${val.name}`, '')}</p>
        </div>
      </div>
    </div>
  </div>);
}
export default Album;
