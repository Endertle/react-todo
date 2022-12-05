import { useEffect, useState } from "react";
import "./Modal.css";

function Modal({ open, handleClose, id, activity, editFunction }) {
  if (!open) return;

  const [editedActivity, setEditedActivity] = useState(activity);

  function handleSubmit(e) {
    e.preventDefault();

    editFunction(id, editedActivity);
    handleClose();
  }

  return (
    <div className="modal">
      <div className="overlay" onClick={handleClose}></div>

      <div className="edit-popup">
        <h2>Edit</h2>
        <button onClick={handleClose} className="close-edit btn">
          x
        </button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editedActivity}
            onChange={(e) => setEditedActivity(e.target.value)}
          />
          <button className="save-edit btn">Save</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
