import React, { Fragment } from 'react'

const ErrorPopup = ({ onClick, message }) => <Fragment>
  <a id="ErrorPopupShowBtn" className="modal-btn" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#ErrorPopup"></a>
  <div className="modal fade" id="ErrorPopup" tabIndex="-1" role="dialog" aria-labelledby="ErrorPopupLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-body pb-4">
          <div className="m-auto d-flex"><span style={{ fontSize: 40 }}>
            <i className="fa fa-error"></i>
          </span></div>
          <p className="p-0 text-center m-0"><strong>Uh oh!</strong></p>
          <p className="py-3 text-center px-4 m-0">{message}</p>
          <div className="d-flex justify-content-around"><a className="btn btn-primary " data-toggle="modal" data-target="#ErrorPopup" onClick={onClick}>OK</a></div>
        </div>
      </div>
    </div>
  </div>
</Fragment>

export default ErrorPopup
