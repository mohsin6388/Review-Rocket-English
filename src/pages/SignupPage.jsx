import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/review-booster-logo2.png";
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all required fields");
      return;
    }
    if (form.password !== form.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      console.log("It is running ============");
      console.log(res?.data);

      if (res?.data?.success === true) {
        login(res.data.user, res.data.token);
        navigate("/dashboard");
      } else {
        setError(res?.data?.message || "Something went wrong");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .signup-shell {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #F0F5FB;
        }
        .signup-left {
          width: 560px;
          flex-shrink: 0;
          background: white;
          padding: 0px 32px 32px 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          
        }
         
        .signup-right {
          flex: 1;
          background: #F0F5FB;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 48px;
        }
        .signup-card {
          width: 100%;
          max-width: 400px;
          background: #fff;
          border: 1px solid #B5D4F4;
          border-radius: 12px;
          padding: 36px;
          box-shadow: 0 4px 24px rgba(14, 68, 124, 0.08);
        }
        @media (max-width: 768px) {
          .signup-shell {
            flex-direction: column;
          }
          .signup-left {
            width: 100%;
            padding: 24px 20px;
            align-items: center;
            text-align: center;
          }
            


          .signup-left .logo {
            height: 120px !important;
            width: 120px !important;
          }
          .signup-left .logo-wrap {
            width: 100% !important;
            padding-top: 0 !important;
          }
          .tagline-heading {
            font-size: 28px !important;
            letter-spacing: -1px !important;
          }
          .tagline-body {
            font-size: 14px !important;
          }
          .signup-right {
            padding: 24px 16px;
          }
          .signup-card {
            padding: 24px 20px;
          }
          .quick-access {
            display: none;
          }
        }


       
      `}</style>

      <div className="signup-shell">
        {/* Left Panel */}
        <div className="signup-left">
          <div>
            <div
              className="logo-wrap"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                paddingTop: 20,
                marginBottom: "auto",
                marginTop: "auto",
              }}
            >
              <img
                src={logo}
                alt="Logo"
                className="logo"
                style={{
                  height: "200px",
                  width: "200px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>

            {/* <div style={{ marginTop: 40 }}>
              <p
                className="tagline-heading"
                style={{
                  fontSize: "45px",
                  fontWeight: "900",
                  lineHeight: "1.05",
                  letterSpacing: "-2.5px",
                  margin: "0 0 22px",
                  maxWidth: "720px",
                  color: "#073057",
                  textShadow: `0px 1px 2px rgba(0,0,0,0.06), 0px 4px 10px rgba(7, 48, 87, 0.12)`,
                  fontFamily: "'Poppins', sans-serif",
                  WebkitFontSmoothing: "antialiased",
                }}
              >
                More Reviews.
                <br />
                <span style={{ color: "#FF741C", position: "relative" }}>
                  More Trust.
                </span>
                <br />
                More Customers.
              </p>

              <p
                className="tagline-body"
                style={{
                  fontSize: "18px",
                  color: "rgba(7, 48, 87, 0.75)",
                  maxWidth: "620px",
                  fontWeight: "400",
                  letterSpacing: "0.3px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Review Ninja Pro helps businesses skyrocket their Google
                ratings, crush negative reviews, and turn every customer into a
                5-star success story.
              </p>
            </div> */}
            <div style={{ marginTop: 40 }}>
              <p className="tagline-heading">
                More Reviews
                <br />
                <span className="highlight-text">More Trust</span>
                <br />
                More Customers
              </p>

              <p className="tagline-body">
                Review Ninja Pro helps businesses skyrocket their Google
                ratings, crush negative reviews, and turn every customer into a
                5-star success story.
              </p>
            </div>
          </div>

          <div className="quick-access" />
        </div>

       
        {/* Right Panel */}
        <div className="signup-right">
          <div style={{ width: "100%", maxWidth: 480 }}>
            <div className="signup-card">
              <p
                style={{
                  fontSize: 11,
                  color: "#378ADD",
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  margin: "0 0 6px",
                  fontWeight: 500,
                }}
              >
                Create account
              </p>
              <h2
                style={{
                  fontSize: 22,
                  color: "#042C53",
                  fontWeight: 700,
                  margin: "0 0 28px",
                }}
              >
                Sign up for free
              </h2>

              {/* Name */}
              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#185FA5",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    marginBottom: 5,
                  }}
                >
                  Full name
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 11,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 15,
                    }}
                  >
                    👤
                  </span>
                  <input
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      height: 42,
                      padding: "0 12px 0 36px",
                      border: "1px solid #B5D4F4",
                      borderRadius: 6,
                      fontSize: 14,
                      color: "#042C53",
                      background: "#F0F5FB",
                      outline: "none",
                    }}
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#185FA5",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    marginBottom: 5,
                  }}
                >
                  Email address
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 11,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 15,
                    }}
                  >
                    ✉️
                  </span>
                  <input
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      height: 42,
                      padding: "0 12px 0 36px",
                      border: "1px solid #B5D4F4",
                      borderRadius: 6,
                      fontSize: 14,
                      color: "#042C53",
                      background: "#F0F5FB",
                      outline: "none",
                    }}
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#185FA5",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    marginBottom: 5,
                  }}
                >
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 11,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 15,
                    }}
                  >
                    🔒
                  </span>
                  <input
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      height: 42,
                      padding: "0 12px 0 36px",
                      border: "1px solid #B5D4F4",
                      borderRadius: 6,
                      fontSize: 14,
                      color: "#042C53",
                      background: "#F0F5FB",
                      outline: "none",
                    }}
                    name="password"
                    type="password"
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#185FA5",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    marginBottom: 5,
                  }}
                >
                  Confirm password
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 11,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 15,
                    }}
                  >
                    🔒
                  </span>
                  <input
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      height: 42,
                      padding: "0 12px 0 36px",
                      border: "1px solid #B5D4F4",
                      borderRadius: 6,
                      fontSize: 14,
                      color: "#042C53",
                      background: "#F0F5FB",
                      outline: "none",
                    }}
                    name="confirm_password"
                    type="password"
                    placeholder="Re-enter password"
                    value={form.confirm_password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {error && (
                <div
                  style={{
                    background: "#FCEBEB",
                    border: "1px solid #F7C1C1",
                    borderRadius: 6,
                    padding: "9px 13px",
                    fontSize: 13,
                    color: "#791F1F",
                    marginBottom: 14,
                  }}
                >
                  ⚠️ {error}
                </div>
              )}

              <button
                style={{
                  width: "100%",
                  height: 44,
                  background: "#073057",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  marginTop: 6,
                }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "⏳ Creating account..." : "🚀 Create Account"}
              </button>

              <p
                style={{
                  textAlign: "center",
                  fontSize: 13,
                  color: "#888780",
                  marginTop: 16,
                }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#185FA5",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Sign in →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;