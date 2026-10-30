import { toast } from "react-toastify";

const defaultOptions = {
  position: "top-right",
  autoClose: 3500,
  closeOnClick: true,
  pauseOnHover: true,
};

export const notify = {
  success: (message, options = {}) => toast.success(message, { ...defaultOptions, ...options }),
  error: (message, options = {}) => toast.error(message, { ...defaultOptions, ...options }),
  info: (message, options = {}) => toast.info(message, { ...defaultOptions, ...options }),
};

export const notifyAsync = (promise, messages, options = {}) =>
  toast.promise(promise, messages, { ...defaultOptions, ...options });

export const confirmAction = (message, confirmLabel = "Eliminar") =>
  new Promise((resolve) => {
    toast(({ closeToast }) => (
      <div className="confirm-notification">
        <p>{message}</p>
        <div className="confirm-notification-actions">
          <button
            type="button"
            className="btn btn-secondary confirm-notification-cancel"
            onClick={() => {
              closeToast();
              resolve(false);
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn bg-delete primary"
            onClick={() => {
              closeToast();
              resolve(true);
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    ), {
      ...defaultOptions,
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      className: "quantum-confirm-toast",
    });
  });
