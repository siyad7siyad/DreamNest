import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import Profile from "./pages/user/Profile";
import About from "./pages/user/About";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
       <Route path="/" element={<Home />}/>
       <Route path="/sign-in" element={<SignIn />}/>
       <Route path="/sign-up" element={<SignUp />}/>
       <Route path="/profile" element={<Profile />}/>
       <Route path="/about" element={<About />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
