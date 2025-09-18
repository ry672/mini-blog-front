import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { MainPage } from "./pages/MainPage/MainPage";
import './index.css'


function App() {

  return (
    <>
      <BrowserRouter>

        <div className="App">

          <div className="container">
            <Routes>
              <Route element={<LoginPage />} path="/" />
              <Route element = {<RegistrationPage/>} path = "/register"/>
              <Route element= {<MainPage/>} path = "/main-page"/>
            

           
            </Routes>
          </div>
        </div>

      </BrowserRouter>
    </>
  );
}

export default App;
