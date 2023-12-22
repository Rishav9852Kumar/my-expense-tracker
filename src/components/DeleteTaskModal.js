import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import "./DeleteTaskModal.css";

const DeleteTaskModal = ({ show, handleClose, task }) => {
  const [titleInput, setTitleInput] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleDelete = async () => {
    const trimmedTaskTitle = task.task_title.trim();
    if (titleInput !== trimmedTaskTitle) {
      toast.error("Title does not match. Please check your inputs");
      return;
    }

    try {
      const deleteUrl = `https://my-expense-tracker-backend.rishavkumaraug20005212.workers.dev/task?task_id=${task.task_id}`;

      await axios.delete(deleteUrl);
      handleClose();
      toast.success("Task entry was deleted successfully!");
       setTimeout(() => {
         setDeleteSuccess(false);
       }, 1000);
    } catch (err) {
      toast.error("Failed to delete task entry. Please try again");
    }
  };

  return (
    <div className={`popup-content ${deleteSuccess ? 'success' : ''}`}>
    <div className={`${show ? "popup show" : "popup"}`}>
      <div className="popup-content">
        <h2>Delete Task</h2>
        <label>Please input Task Title to confirm deletion </label>
        <input type="text" onChange={(e) => setTitleInput(e.target.value)} />
        <button onClick={handleClose}>Close</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
    </div>
  );
};

export default DeleteTaskModal;
