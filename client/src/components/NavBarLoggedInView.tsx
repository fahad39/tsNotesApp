import React from "react";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";
import { Button, Navbar } from "react-bootstrap";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await NotesApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <>
      <Navbar.Text className="mb-2">Signed in as : {user.username}</Navbar.Text>
      <Button onClick={logout}>Log out</Button>
    </>
  );
};

export default NavBarLoggedInView;
