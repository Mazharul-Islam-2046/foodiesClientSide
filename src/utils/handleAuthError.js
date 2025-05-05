import { toast } from "react-toastify";

export const handleAuthError = (error) => {

    const errorToast = (message) => toast(`❌ ${message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });


    switch (error.code) {
        // 🔹 Common Authentication Errors
        case "auth/email-already-in-use":
            console.error("This email is already in use.");
            errorToast("This email is already in use.")
            break;

        case "auth/invalid-email":
            console.error("Invalid email format.");
            errorToast("Invalid email format.")
            break;

        case "auth/weak-password":
            console.error("Password should be at least 6 characters.");
            errorToast("Password should be at least 6 characters.")
            break;

        case "auth/user-not-found":
            console.error("No account found with this email.");
            errorToast("No account found with this email.")
            break;

        case "auth/wrong-password":
            console.error("Incorrect password.");
            errorToast("Incorrect password.")
            break;

        case "auth/too-many-requests":
            console.error("Too many failed attempts. Please try again later.");
            errorToast("Too many failed attempts. Please try again later.")
            break;

        case "auth/network-request-failed":
            console.error("Network error. Please check your connection.");
            errorToast("Network error. Please check your connection.")
            break;

        case "auth/user-disabled":
            console.error("This account has been disabled.");
            errorToast("This account has been disabled.")
            break;

        case "auth/requires-recent-login":
            console.error("Please log in again to perform this action.");
            errorToast("Please log in again to perform this action.")
            break;

        // 🔹 Default case
        default:
            console.error("Authentication error:", error.message);
            errorToast("Authentication error: " + error.message)
            break;
    }
};
