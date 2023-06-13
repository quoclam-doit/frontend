import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axiosClient from "../../axiosClient";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const LoginRegister = ({ location }) => {
  const history = useHistory();
  const { pathname } = location;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [redirectToHome, setRedirectToHome] = useState(false);
  useEffect(() => {
    if (redirectToHome) {
      history.push("/home");
    }
  }, [redirectToHome, history]);

  const handleLogin = async (event) => {
    event.preventDefault();
    // Làm gì đó với username và password
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      const data = await axiosClient.post("signIn", {
        email: username,
        password: password,
      });
      localStorage.setItem("access_token", data.token);
      toast.success("Login Successfull");
      setRedirectToHome(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    // const data = await axiosClient.get(`signIn`);
    // const data = await axiosClient.put(`signIn/${}`,{email: username, password: password});
    // const data = await axiosClient.delete(`signIn/${}`);
    // Reset giá trị trong form
    // setUsername("");
    // setPassword("");
  };

  const handleRegistration = (event) => {
    event.preventDefault();

    // Làm gì đó với username, password và email
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Email:", email);

    // Reset giá trị trong form
    setUsername("");
    setPassword("");
    setEmail("");
  };

  return (
    <Fragment>
      <MetaTags>
        <title>PartyPaLs | Đăng nhập</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Đăng Nhập - Đăng Kí
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Đăng nhập</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Đăng kí</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleLogin}>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Tên đăng nhập"
                                value={username}
                                onChange={(event) =>
                                  setUsername(event.target.value)
                                }
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(event) =>
                                  setPassword(event.target.value)
                                }
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Nhớ mật khẩu</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Quên mật khẩu?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Đăng nhập</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleRegistration}>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Tên đăng nhập"
                                value={username}
                                onChange={(event) =>
                                  setUsername(event.target.value)
                                }
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(event) =>
                                  setPassword(event.target.value)
                                }
                              />
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                  setEmail(event.target.value)
                                }
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Đăng kí</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object,
};

export default LoginRegister;
