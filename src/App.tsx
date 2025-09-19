import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { MainPage } from "./pages/MainPage/MainPage";
import './index.css'
import { CreatePostForm } from "./components/UI/PostForm/PostForm";
import { PostPage } from "./pages/PostPage/PostPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { CategoryPage } from "./pages/CategoryPage/CategoryPage";


function App() {

  return (
    <>
      <BrowserRouter>
      <div className="min-h-screen w-full flex justify-center items-center">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path = "/create-post" element={<CreatePostForm/>}/>
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path ="/profile" element={<ProfilePage/>}/>
        <Route path="/categories/:id" element={<CategoryPage />} />
      </Routes>
      </div>
      </BrowserRouter>

    </>
  );
}

export default App;
