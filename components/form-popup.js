import React from 'react'
import { postNotes } from '../services/rest_service'

const FormPopup = ({ albumName, onClose }) => {

  const [note, setnote] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isValid, setIsValid] = React.useState(false)
  const [error, setError] = React.useState({ note: '', post: '' })

  const submitForm = () => {
    setIsSubmitting(true)
    setError({ ...error, post: '' })
    postNotes({ albumName, note }).then(response => {
      if (response.id) {
        document.getElementById('FormPopupShowBtn').click()
        onClose();
        alert('Your note submitted successfully.')
      } else {
        setError({ ...error, post: 'Something went wrong. Please try again later!' })
      }
    })
      .catch(error => {
        setError({ ...error, post: 'Something went wrong. Please try again later!' })
      })
      .finally(() => setIsSubmitting(false))
  }

  const isValidFn = () => true
    && (!!note.trim())

  React.useEffect(() => {
    setIsValid(isValidFn());
  }, [
    note
  ])

  return (
    <>
      <a id="FormPopupShowBtn" className="modal-btn" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#FormPopup"></a>
      <div className="modal fade" id="FormPopup" tabIndex="-1" role="dialog" aria-labelledby="FormPopupLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header ">
              <h6 className="modal-title " id="FormPopupLabel">Add a note</h6>
              <button type="button" className="close" onClick={onClose} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body pb-4">
              <form>
                <div className="form-group m-0">
                  <label className="m-0">Album Name</label>
                  <input type="text" readOnly className="form-control input-outline"
                    value={albumName} />
                </div>
                <div className="form-group m-0">
                  <label className="m-0">Notes</label>
                  <textarea className="form-control input-outline"
                    placeholder="Enter your notes here..."
                    value={note}
                    onChange={e => {
                      setnote(e.target.value)
                      setError({ ...error, note: '' })
                    }} />
                  {!!error.note && <span className="text-danger"><small>{error.note}</small></span>}
                </div>
                {!!error.post && <div className="my-3 error">
                  Something unexpected happened!
              </div>}
                <button type="submit" disabled={!isValid || isSubmitting} onClick={submitForm} className="btn btn-primary btn-lg btn-block btn-flip  btn-flip-sm mt-3">SUBMIT</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormPopup
