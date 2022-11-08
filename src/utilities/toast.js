import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToastMessage = message => {
  toast.success(`${message}`, {
    position: toast.POSITION.TOP_RIGHT,
  });
  console.log(message);
};

export { ToastContainer, showToastMessage };
