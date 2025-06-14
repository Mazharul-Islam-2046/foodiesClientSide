import { api } from "../../api/axiosInstance.js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../../Firebase/firebase.config.js";
import usersApi from "../../api/usersApi.js";
import { AuthContext } from "./AuthContext.js";
import { handleAuthError } from "../../utils/handleAuthError.js";

const auth = getAuth(app);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Initialize navigate
  const [location, setLocation] = useState("");
  
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  console.log("user:- ", user);

  // Firebase Authentication Methods
  const userRegister = async (data) => {
    const { email, password, ...additionalData } = data;

    console.log("user reg info :- ", email,password, additionalData);
    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      if (firebaseUser) {
        // Send registration data to your backend
        const response = await usersApi.register({
          name: additionalData.name,
          email: firebaseUser.email,
          password: password, // Your backend will hash this
          phone: additionalData.phone,
          address: additionalData.address,
        });

        console.log(response);

        return response.data;
      }
    } catch (err) {
      handleAuthError(err);
    }
  };

  const userLogin = async ({ email, password }) => {
    try {
      // Login with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;
      console.log(firebaseUser);

      // Get JWT from your backend
      const response = await usersApi.login({
        email: firebaseUser.email,
        password,
      });

      // Store tokens
      const {
        accessToken,
        refreshToken,
        user: serverUser,
      } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Set user state
      setUser(serverUser);

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  const googleSignIn = async () => {
    try {
      // Google Sign-In with Firebase
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const firebaseUser = userCredential.user;
      console.log(firebaseUser);

      // Get Information from Google
      const name = firebaseUser.displayName;
      const email = firebaseUser.email;
      const photoURL = firebaseUser.photoURL;
      const phone = firebaseUser.phoneNumber;

      // Send Google user to your backend for JWT
      const response = await api.post("/users/auth/login", {
        email,
        name,
        photoURL,
        phone,
        isGoogleSignIn: true,
      });

      // Store tokens
      const {
        accessToken,
        refreshToken,
        user: serverUser,
      } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log("Google User:- ", response.data.data.user);

      // Set user state
      setUser(serverUser);

      // Optionally store tokens and update user state if needed
      // const { accessToken, refreshToken, user: serverUser } = response.data.data;
      // localStorage.setItem('accessToken', accessToken);
      // localStorage.setItem('refreshToken', refreshToken);
      // setUser(serverUser);
    } catch (err) {
      handleAuthError(err);
    }
  };

  const logout = async () => {
    try {
      // Firebase logout
      await signOut(auth);

      // Backend logout
      await api.post("/users/auth/logout");

      // Clear tokens and user state
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    } catch (err) {
      setError(err.response?.data?.message || "Logout failed");
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await api.put("", userData);
      setUser(response.data.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
      throw err;
    }
  };

  // Check authentication on app load
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const metadata = firebaseUser.metadata;
        const creationTime = metadata.creationTime;
        const lastSignInTime = metadata.lastSignInTime;

        if (creationTime === lastSignInTime) {
          // User is newly created, sign out and redirect to login page
          await signOut(auth);
        } else {
          try {
            // Verify user with backend
            const response = await api.get(
              `/users/getUserByEmail/${firebaseUser.email}`
            );
            setUser(response.data.data);
          } catch (err) {
            console.error(err);
            // Token invalid or user not found
            logout();
          }
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Axios interceptor for adding token to requests
  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => api.interceptors.request.eject(interceptor);
  }, []);

  const authContextValue = {
    user,
    loading,
    error,
    location,
    userRegister,
    userLogin,
    googleSignIn,
    logout,
    updateProfile,
    setError,
    setLocation,
    isSignInModalOpen,
    setIsSignInModalOpen,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
