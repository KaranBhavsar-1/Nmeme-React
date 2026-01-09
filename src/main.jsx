import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./Component/HomePage/Home";
import Browse from "./Component/BrowsePage/Browse";
import LikedMemePage from "./Component/LikedPage/LikedMemePage";
import Settings from "./Component/Settings/Settings";
import Layout from "./Component/Layout/Layout";
import { MemeProvider } from "./Component/FetchMemesAPI/MemeContext";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="browse" element={<Browse />} />
      <Route path="likedmemes" element={<LikedMemePage />} />
      <Route path="settings" element={<Settings />} />
      {/* <Route path='user/:userid' element={<User />} /> */}
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MemeProvider>
      <RouterProvider router={router} />
    </MemeProvider>
  </StrictMode>
);
