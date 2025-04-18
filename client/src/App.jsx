import React, { useState } from "react";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; 
import Lottie from "react-lottie-player";
import animationData from "./animationIntro.json";
import Home from "./Pages/HomePage/Home";
import CareerMain from "./Pages/Carrer/CareerMain";
import CertificationMain from "./Pages/Certification/CertificationMain";
import TrainingMain from "./Pages/Training/TrainingMain";
import CertForm from "./Pages/Login/Forms/CertifiedForms/CertForm";
import DelegateForm from "./Pages/Login/Forms/DelegateForms/DelegateForm";
import CarrerDetails from "./Pages/Login/Forms/CarrerDetails/CarrerDetails";
import Updation from "./Pages/Login/Forms/Updation";
import EmpLogin from "./Pages/Login/EmpLogin.jsx/EmpLogin";
import ProtectedRoute from "./Pages/ProtectedRoute";
import NewsUpdate from "./Pages/Login/Forms/NewsUpdate/NewsUpdate";
import OnlinepaymentMain from "./Pages/OnlinePayment/OnlinepaymentMain";
import RefundPolicy from "./Pages/OnlinePayment/RefundPolicy/RefundPolicy";
import PrivacyPolicy from "./Pages/OnlinePayment/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./Pages/OnlinePayment/TremsAndConditions/TermsAndConditions";

function App() {
  const [isAnimationComplete, setAnimationComplete] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App font-in scroll-smooth">
      {!isAnimationComplete ? (
        <div className="h-screen flex justify-center items-center">
          <Lottie
            loop={false}
            animationData={animationData}
            play
            style={{ width: 500, height: 500, margin: "auto" }}
            onComplete={() => setAnimationComplete(true)}
          />
        </div>
      ) : (
        <Router>
          <Routes>
            {/* <Route index element={<Home />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/career" element={<CareerMain />} />
            <Route path="/certification" element={<CertificationMain />} />
            <Route path="/training" element={<TrainingMain />} />
            {/* <Route path="/onlinePayment" element={<OnlinepaymentMain/>} /> */}
            <Route path="/refundPolicy" element={<RefundPolicy/>} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy/>} />
            <Route path="/terms&Conditions" element={<TermsAndConditions/>} />
            <Route
              path="/updation"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Updation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={<EmpLogin setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/certForm" element={<CertForm />} />
            <Route path="/delegateForm" element={<DelegateForm />} />
            <Route path="/carrerUpdate" element={<CarrerDetails />} />
            <Route path="/newsUpdate" element={<NewsUpdate />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
