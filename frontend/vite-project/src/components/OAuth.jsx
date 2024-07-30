import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Ensure popup is allowed
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      const result = await signInWithPopup(auth, provider);
      
      const res = await axios.post(
        "http://localhost:3000/api/auth/google",
        {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(signInSuccess(res.data.user));
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Could not sign in with Google", error);
      toast.error(error.message || "An error occurred during sign-in");
    }
  };

  return (
    <div className="flex justify-center items-center mt-5">
      <button
        onClick={handleGoogleClick}
        type="button"
        className="flex items-center bg-red-700 font-semibold text-white p-3 rounded-lg uppercase hover:opacity-95 transition duration-300 ease-in-out transform hover:scale-105"
      >
        <FcGoogle className="mr-2 text-xl" />
        Continue With Google
      </button>
      <ToastContainer />
    </div>
  );
}
