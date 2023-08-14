import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import {UserContext} from "./context/UserProvider";

import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";

import Navbar from "./components/Navbar";
import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth";
import LayoutContainerForm from "./components/layouts/LayoutContainerForm";
import LayoutRedirect from "./components/layouts/LayoutRedirect";

import Layout404 from "./routes/Layout404";
import Profile from "./routes/Profile";
import Editar from "./routes/Editar";

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <Routes> 
        <Route path="/" element={<LayoutRequireAuth />}>
          <Route index element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/editar/:nanoid" element={<Editar/>}/>
        </Route>
        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Route>
        <Route path="/:nanoid" element={<LayoutRedirect />}> 
          <Route index element={<Layout404 />}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
