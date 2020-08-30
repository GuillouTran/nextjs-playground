/* eslint-disable no-unused-vars */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "react-feather";
import { Col, Grid, Row } from "react-flexbox-grid";

import { currentDayName } from "../utils/dateUtils";

const menu = [
  { path: "/", name: "dash" },
  { path: "/blog", name: "blog" },
  { path: "/about", name: "about" },
  { path: "/uses", name: "uses" },
  { path: "/reviews", name: "reviews" },
];

function Layout({ children, isBlog, secondaryPage, noHead = false }) {
  const onLoadTheme =
    typeof localStorage !== "undefined" && localStorage.getItem("BLOG_THEME");
  const [theme, setTheme] = useState(onLoadTheme);
  const [mounted, setMounted] = useState(false);
  const switchTheme = () => {
    const setTo = theme === "dark" ? "light" : "dark";

    setTheme(setTo);
  };

  useEffect(() => {
    if (onLoadTheme) return;

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("BLOG_THEME", theme);

    setMounted(true);
  }, [theme]);

  const containerProps = {
    ...(isBlog && { md: 12 }),
    ...(!isBlog && { md: 8, mdOffset: 2 }),
  };

  if (!mounted) return <div />;

  return (
    <>
      <div className="top-menu">
        <Row>
          <Col xs={10}>
            <ul>
              <li className="logo">
                <Link href="/" as="/">
                  <a>⧩</a>
                </Link>
              </li>

              {menu.map(({ path, name }) => (
                <li key={name}>
                  <Link href={path} as={path}>
                    <a>{name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={2} style={{ textAlign: "right" }}>
            <button
              type="button"
              className="theme-switch-button"
              onClick={() => switchTheme()}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
          </Col>
        </Row>
      </div>

      <Grid>
        <Row>
          <Col {...containerProps}>
            {!secondaryPage && (
              <h1
                className="blog-title"
                style={
                  isBlog && {
                    textAlign: "left",
                  }
                }
              >
                Guilloutran, code<span className="amp">& </span> things!
              </h1>
            )}

            {children}
          </Col>
        </Row>
      </Grid>

      <footer>
        <div>No tracking. No ads. Happy {currentDayName()}!</div>
        <div>
          & copy;
          {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
}

export default Layout;
