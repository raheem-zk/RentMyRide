import { toast } from "react-toastify";

export  const ErrorMessage = (message: string): void => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log(message);
  };

  export const isDateValid = (start, end) => {
    const currentDate = new Date();
  
    const currentDateStr = currentDate.toISOString().slice(0, 10);
  
    console.log('start data:', start, 'end Date:', end, 'current data:', currentDateStr);
  
    if (start > end) {
      return false;
    }
  
    if (currentDateStr >= end) {
      return false;
    }
  
    return true;
  };
  