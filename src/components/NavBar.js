import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utlis";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser;

  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
    
    }
  };

  const addPostIcon = (
  <>
    <NavDropdown 
    title="Add" 
    id="basic-nav-dropdown"
    >
      <NavDropdown.Item >
        <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/posts/create"
        >
        <i className="far fa-plus-square"></i>Add post
        </NavLink>
      </NavDropdown.Item>
      <NavDropdown.Item >
        <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/jobs/create"
        >
        <i className="far fa-plus-square"></i>Add job
        </NavLink>
      </NavDropdown.Item>
      <NavDropdown.Item >
        <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/skills/create"
        >
        <i className="far fa-plus-square"></i>Add a skill
        </NavLink>
      </NavDropdown.Item>
    </NavDropdown>
  </>
  );

  const loggedInIcons = (
  <>
   <NavLink
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/feed"
    >
      <i className="fas fa-stream"></i>Feed
    </NavLink>
    <NavLink
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/liked"
    >
      <i className="fas fa-heart"></i>Liked
    </NavLink>
    <NavLink
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/skills"
    >
      <i className="fas fa-file"></i>Skills
    </NavLink>
    <NavLink
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/jobs"
    >
      <i className="fas fa-briefcase"></i>Jobs
    </NavLink>
    <NavLink
    className={styles.NavLink}
    to="/"
    onClick={handleSignOut}
    >
      <i className="fas fa-sign-out-alt"></i>Signout
    </NavLink>
    <NavLink
    className={styles.NavLink}
    to={`/profiles/${currentUser?.profile_id}`}
    >
      <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
    </NavLink>
  </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle
        ref={ref}
        onClick={() => setExpanded(!expanded)}
        aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;