import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "gatsby";
import useLogoMaxHeight50 from "../hooks/useLogoMaxHeight50";
import { FaGitlab } from "react-icons/fa";
import useMenuItems, { useMenuItemsTree } from "../hooks/useMenuItems";

interface NavigationProps {
  currentHref: string;
}

const Navigation: React.FC = () => {
  const logo = useLogoMaxHeight50();
  const menuItems = useMenuItemsTree().filter(
    (item) => item.href !== "/website/"
  );

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img
          src={logo.src}
          height={logo.height}
          width={logo.width}
          alt="T-Mobile Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          {menuItems.map((menu) => (
            <Nav.Link
              as={Link}
              to={menu.href}
              title={menu.hint}
              key={menu.href}
            >
              {menu.text}
            </Nav.Link>
          ))}
          <Nav.Link
            href="https://github.com/tmobile/gatsby-starter-gitlab"
            target="_blank"
            title="Fork us on Gitlab"
          >
            <FaGitlab />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
