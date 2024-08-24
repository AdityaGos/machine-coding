import logo from "./logo.svg";
import "./App.css";
import { ToastModal } from "./component/ToastModal/ToastModal";
import { useState } from "react";

function App() {
  const [toasts, setToasts] = useState([]);

  function handleAddToast(e) {
    const id = new Date().getTime();
    const type = e.target.id;
    const message = e.target.dataset.message ? e.target.dataset.message : type;

    setToasts((prev) => [...prev, { id, message, type }]);
  }

  function handleClose(id) {
    const newarray = toasts.filter((item) => item.id !== id);
    setToasts(newarray);
  }
  return (
    <div className="App">
      <div className="toast-container">
        {toasts.map((item) => (
          <ToastModal
            id={item.id}
            key={item.id}
            type={item?.type}
            message={item?.message}
            handleClose={handleClose}
          />
        ))}
      </div>

      <button
        id="success"
        data-message="successfully created"
        className="button"
        onClick={(e) => handleAddToast(e)}
      >
        {" "}
        Success
      </button>
      <button id="warn" className="button" onClick={(e) => handleAddToast(e)}>
        {" "}
        Warning
      </button>
      <button id="error" className="button" onClick={(e) => handleAddToast(e)}>
        {" "}
        Error
      </button>
      <button id="info" className="button" onClick={(e) => handleAddToast(e)}>
        {" "}
        Info
      </button>
    </div>
  );
}

export default App;
