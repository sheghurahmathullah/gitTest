import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { all_routes } from "../../router/all_routes";

const Login = () => {

  const routes = all_routes;

  const { loginAuth } = useAuth();



  const [isPasswordVisible, setPasswordVisible] = useState(false);


  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  useEffect(() => {
    localStorage.setItem("menuOpened", "Dashboard");
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      // setErrorMessage("All fields are mandatory.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      // setErrorMessage("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    loginAuth(formData.email, formData.password);

  //   try {
  //     const response = await fetch(
  //       `${api_path}/users/logIn?username=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`,
  //       { method: "GET" }
  //     );
  //     const data = await response.json();

  //     if (response.ok) {
  //       console.log(data);
  //       const { isValid, role, message } = data;
  //       navigationPath(role);
  //       // Use isValid, role, and message as needed
  //       console.log(isValid, role, message);
  //     } else {
  //       const errorMessage = response.status === 401
  //         ? "Invalid username or password"
  //         : "An error occurred: " + data.error;
  //       alert(errorMessage);
  //       console.log(data);
  //     }
  // } catch (error) {
  //   console.error('Error signing in:', error);
  // }
};


  return (
    <div className="container-fuild vh-100">
      <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
              <div className="col-md-8 mx-auto p-4">
                <form>
                  <div>
                    <div className=" mx-auto mb-5 text-center">
                      <img
                        src="https://learn.org/cimages/lead-clients/sacred-heart-university/logo-330.jpg"
                        className="img-fluid"
                        alt="Logo"
                      />
                    </div>
                    <div className="card">
                      <div className="card-body pb-3">
                        <div className=" mb-4">
                          <h2 className="mb-2">Welcome</h2>
                          <p className="mb-0">
                            Please enter your details to sign in
                          </p>
                        </div>
                        <div className="mb-3 ">
                          <label className="form-label">Email Address</label>
                          <div className="input-icon mb-3 position-relative">
                            <span className="input-icon-addon">
                              <i className="ti ti-mail" />
                            </span>
                            <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  placeholder="Enter the Email"
                                  className="form-control"
                                  value={formData.email}
                                  onChange={handleChange}
                                />
                          </div>
                          <label className="form-label">Password</label>
                          <div className="pass-group">
                          <input
                                  type={isPasswordVisible ? "text" : "password"}
                                  id="password"
                                  name="password"
                                  placeholder="Enter the password"
                                  className="pass-input form-control"
                                  value={formData.password}
                                  onChange={handleChange}
                                />
                            <span
                              className={`ti toggle-password ${
                                isPasswordVisible ? "ti-eye" : "ti-eye-off"
                              }`}
                              onClick={togglePasswordVisibility}
                            />
                          </div>
                        </div>
                        <div className="form-wrap form-wrap-checkbox">
                          <div className="d-flex align-items-center">
                            <div className="form-check form-check-md mb-0">
                              <input placeholder=""
                                className="form-check-input mt-0"
                                type="checkbox"
                              />
                            </div>
                            <p className="ms-1 mb-0 ">Remember Me</p>
                          </div>
                          <div className="text-end ">
                            <Link to={routes.forgotPassword}className="link-danger">
                              Forgot Password?
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 pt-0">
                        <div className="mb-3">
                          <button
                            // to={routes.adminDashboard}
                            onClick={handleSubmit}
                            className="btn btn-primary w-100"
                          >
                            Sign In
                          </button>
                        </div>
                        <div className="text-center">
                          <h6 className="fw-normal text-dark mb-0">
                            Don’t have an account?{" "}
                            <Link to={routes.register} className="hover-a ">
                              {" "}
                              Create Account
                            </Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                  
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
