import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { MainPage } from "./pages/MainPage/MainPage";
import './index.css'
import { CreatePostForm } from "./components/Post/Post";
import { PostPage } from "./pages/PostPage/PostPage";


function App() {

  return (
    <>
      <BrowserRouter>
      <div className="bg-gradient-to-br from-blue-600 to-cyan-300 min-h-screen w-full flex justify-center items-center">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path = "/create-post" element={<CreatePostForm/>}/>
        <Route path="/posts/:postId" element={<PostPage />} />
      </Routes>
      </div>
      </BrowserRouter>

    </>
  );
}

export default App;
