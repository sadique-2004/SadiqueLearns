import React from "react";
import { Container, LogoutBtn, logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav>
          <Link to="/">
            <img src={logo} alt="Sadique Learns" className="h-24" />
          </Link>
        </nav>

        <ul className="flex ml-auto">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => {
                    navigate(item.slug);
                  }}
                  className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}

          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </Container>
    </header>
  );
};

export default Header;
