
import React, { useEffect, lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Authentication from "./component/common/Authentication.jsx";
import Error from "./pages/Error.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const LogIn = lazy(() => import("./pages/LogIn.jsx"));
const SignIn = lazy(() => import("./pages/SignIn.jsx"));
const AllPost = lazy(() => import("./pages/AllPost.jsx"));
const AddPost = lazy(() => import("./pages/AddPost.jsx"));
const MyPost = lazy(() => import("./pages/MyPost.jsx"));
const EditPost = lazy(() => import("./pages/EditPost.jsx"));
const Post = lazy(() => import("./pages/Post.jsx"));
const Search = lazy(()=>import("./pages/Search.jsx"))

import service from "./aapwrite/config.js";
import { setPosts } from "./store/postSlice.js";
import authService from "./aapwrite/Auth.js";
import { login } from "./store/authSlice.js";


function App() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        dispatch(setPosts(posts?.documents));
      }
    });

    const user = JSON.parse(localStorage.getItem("login"));

    if (!user || userStatus) {
      return;
    }

    authService
      .logIn(user)
      .then((session) => {
        if (session) {
          authService.getCurrentUser().then((userdata) => {
            if (userdata) dispatch(login(userdata));
          }).catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  }, [dispatch, userStatus]);

  return (
    <div className="bg-background text-text font-body">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Authentication authentication={false}>
                <Suspense fallback={<div>Loading...</div>}>
                  <Home />
                </Suspense>
              </Authentication>
            }
          />
          <Route
            path="/login"
            element={
              <Authentication authentication={false}>
                <Suspense fallback={<div>Loading...</div>}>
                  <LogIn />
                </Suspense>
              </Authentication>
            }
          />
          <Route
            path="/signin"
            element={
              <Authentication authentication={false}>
                <Suspense fallback={<div>Loading...</div>}>
                  <SignIn />
                </Suspense>
              </Authentication>
            }
          />

          <Route
            path="/my-blogs"
            element={
              <Authentication authentication={true}>
                <Suspense fallback={<div>Loading...</div>}>
                  <MyPost />
                </Suspense>
              </Authentication>
            }
          />
          <Route
            path="/edit-blog/:slug"
            element={
              <Authentication authentication={true}>
                <Suspense fallback={<div>Loading...</div>}>
                  <EditPost />
                </Suspense>
              </Authentication>
            }
          />
          <Route
            path="/post/:slug"
            element={
              <Authentication authentication={false}>
                <Suspense fallback={<div>Loading...</div>}>
                  <Post />
                </Suspense>
              </Authentication>
            }
          />
          <Route
            path="/add-blog"
            element={
              <Authentication authentication={true}>
                <Suspense fallback={<div>Loading...</div>}>
                  <AddPost />
                </Suspense>
              </Authentication>
            }
          />
          <Route path="/*" element={<Error />} />
          <Route
            path="/search"
            element={
              <Authentication authentication={false}>
                <Suspense fallback={<div>Loading...</div>}>
                  <Search />
                </Suspense>
              </Authentication>
            }
          />
      
        </Routes>
      </Router>
    </div>
  );
}

export default App;