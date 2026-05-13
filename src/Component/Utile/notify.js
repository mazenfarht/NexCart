import { toast } from "react-toastify";
export const nostify = (msg, type) => {
  toast[type](msg);
};
