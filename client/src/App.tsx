import React, { useState, useEffect } from "react";
import SignupModal from "./components/SignupModal";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/Navbar";
import { User } from "./models/user";
import * as NotesApi from "./network/notes_api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NotesPage from "./pages/NotesPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Container>
          <Routes>
            <Route
              path="/"
              element={<NotesPage loggedInUser={loggedInUser} />}
            />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Container>

        {showSignUpModal && (
          <SignupModal
            onDismiss={() => {
              setShowSignUpModal(false);
            }}
            onSignupSuccssful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }}
          />
        )}
        {showLoginModal && (
          <LoginModal
            onDismiss={() => {
              setShowLoginModal(false);
            }}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false);
            }}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
