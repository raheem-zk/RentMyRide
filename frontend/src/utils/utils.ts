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

 export const isDateValid = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()); // Check if the date is a valid Date object
  };