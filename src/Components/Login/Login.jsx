import { useFormik } from "formik";
import notesImg from "../../images/notes1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Login() {
  let validationSchema = yup.object({
    email: yup.string().required("email is required").email(),

    password: yup.string().required("password is required"),
  });
  let navigate = useNavigate();
  function confirmLogIn(values) {
    console.log(values);
    axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signIn", values)
      .then((res) => {
        console.log(res);
        localStorage.setItem("usertoken", res.data.token);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: confirmLogIn,
    validationSchema,
  });
  return (
    <>
      <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
        <i className="fa-regular fa-note-sticky text-info fs-2"></i>
        <p className="ps-2 fs-4 fw-bold">Notes</p>
      </li>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
            <img className="w-100 p-5" src={notesImg} alt="" />
          </div>

          <div className="col-lg-7">
            <div className="min-vh-100 d-flex justify-content-center align-items-center text-center signup-container">
              <div className="bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-2">
                <h1 className="fw-bold">Sign In Now</h1>
                <div className="pt-3">
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                    />

                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Your Password"
                    />

                    <button
                      type="submit"
                      className="btn btn-info text-light w-100 rounded-2 mt-2"
                    >
                      Login
                    </button>
                  </form>
                  <p>
                    Don't Have Account ? <a href="/">Register Now</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
