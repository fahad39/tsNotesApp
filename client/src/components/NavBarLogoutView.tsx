import React from "react";
import { Button } from "react-bootstrap";

interface NavBarLogoutViewProps {
  onSignupClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLogoutView = ({
  onSignupClicked,
  onLoginClicked,
}: NavBarLogoutViewProps) => {
  return (
    <>
      <Button onClick={onSignupClicked}>sign up</Button>
      <Button onClick={onLoginClicked}>Login</Button>
    </>
  );
};

export default NavBarLogoutView;
