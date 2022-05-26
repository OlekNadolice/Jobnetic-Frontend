import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from "utils/PublicRoute";
import PrivateRoute from "utils/PrivateRoute";
import AppContextProvider from "Context/App.context";

import { useContext } from "react";
import { appContext } from "Context/App.context";
import Navbar from "Layouts/Navbar/Navbar";
import ModalContainer from "utils/ModalContainer";

const Login = lazy(() => import("Pages/Login"));
const Register = lazy(() => import("Pages/Register"));
const ThankYou = lazy(() => import("Pages/ThankYou/ThankYou"));
const Landing = lazy(() => import("Pages/Landing/Landing"));
const Home = lazy(() => import("Pages/Home/Home"));
const AdvertismentPage = lazy(() => import("Pages/AdvertismentPage/AdvertismentPage"));
const About = lazy(() => import("Pages/About/About"));
const Post = lazy(() => import("Pages/PostPage/PostPage"));
const Offerts = lazy(() => import("Pages/Offerts/Offerts"));

const RoutesDefinition = () => {
  const { isLoggedIn } = useContext(appContext);

  return (
    <AppContextProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <ModalContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<PrivateRoute element={<Home />} />} />
            <Route path="/landing" element={<PublicRoute element={<Landing />} />} />
            <Route path="/login" element={<PublicRoute element={<Login />} />} />
            <Route
              path="/advertisment:id"
              element={<PrivateRoute element={<AdvertismentPage />} />}
            />
            <Route path="/register" element={<PublicRoute element={<Register />} />} />
            <Route path="/thanks" element={<PublicRoute element={<ThankYou />} />} />
            <Route path="/about" element={<PrivateRoute element={<About />} />} />
            <Route path="/post:id" element={<PrivateRoute element={<Post />} />} />
            <Route path="/offerts" element={<PrivateRoute element={<Offerts />} />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default RoutesDefinition;
