import { toast } from "react-toastify";

const defaultOptions = {
  position: "top-right",

  autoClose: 3000,

  hideProgressBar: false,

  closeOnClick: true,

  pauseOnHover: true,

  draggable: true,

  theme: "dark",
};

// SUCCESS
export const notifySuccess = (msg) => {
  toast.success(msg, defaultOptions);
};

// ERROR
export const notifyError = (msg) => {
  toast.error(msg, defaultOptions);
};

// WARNING
export const notifyWarning = (msg) => {
  toast.warning(msg, defaultOptions);
};

// INFO
export const notifyInfo = (msg) => {
  toast.info(msg, defaultOptions);
};
