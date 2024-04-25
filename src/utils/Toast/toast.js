import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


export const NotificationTypes = {
    ERROR: "error",
    SUCCESS: "success",
    WARNING: "warning",
};

export const showNotification = (message, type) => {
    let options = {
        style: {

            color: type==NotificationTypes.ERROR?"red": "#4BBB93",
            background: "white",
            fontWeight: "500",
            fontSize: "16px",
            padding: '0px 0px 0px 8px',
            borderRadius: "8px",
            fontFamily: 'Mulish, sans-serif',
        },
        icon:
        type==NotificationTypes.ERROR? <>
         <div >
         <svg xmlns="http://www.w3.org/2000/svg" height="23" width="22" viewBox="0 0 512 512" fill="red">
         <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>

            </div> </> :
            <div >
              <svg xmlns="http://www.w3.org/2000/svg" height="23" width="22" viewBox="0 0 512 512" fill="#4BBB93">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
            </div>
    };


    toast[type]?.(message, options);
};
