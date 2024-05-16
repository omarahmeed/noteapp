import { useFormik } from "formik";
import notesImg from "../../images/notes1.png";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [msg, setmsg] = useState("");
  function clear() {
    setmsg("");
  }

  let navigate = useNavigate();
  function confirmRegister(values) {
    console.log(values);
    axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values)
      .then((res) => {
        console.log(res);
        setmsg(res.data.msg);
        navigate("/login");
      })
      .catch((err) => {
        setmsg(err.response.data.msg);
        console.log(err);
      });
  }
  let validationSchema = yup.object({
    name: yup
      .string()
      .required("name is required")
      .min(3, "minmum characters is three")
      .max(10, "max characters is ten"),
    email: yup.string().required("email is required").email(),
    age: yup
      .number()
      .required("age is required")
      .min("12", "lazm tp2a kber shwya lmo25za y3ne ")
      .max(90, "yagd3 kber dmaghk anta pt3ml eh "),
    phone: yup
      .string()
      .required("phone is required")
      .matches(/^(?:\+?20|0)?1[0-9]{9}$/),
    password: yup.string().required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    onSubmit: confirmRegister,
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
                <h1 className="fw-bold">Sign Up Now</h1>
                <div className="pt-3">
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Your Name"
                    />
                    {formik.touched.name ? <p>{formik.errors.name}</p> : ""}
                    <input
                      onFocus={clear}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                    />
                    {formik.touched.email ? <p>{formik.errors.email}</p> : ""}

                    <input
                      onFocus={clear}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Your Password"
                    />
                    {formik.touched.password ? (
                      <p>{formik.errors.password}</p>
                    ) : (
                      ""
                    )}
                    <input
                      onFocus={clear}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="number"
                      name="age"
                      id="age"
                      placeholder="Enter Your Age"
                    />
                    {formik.touched.age ? <p>{formik.errors.age}</p> : ""}
                    <input
                      onFocus={clear}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Enter Your Phone Number"
                    />
                    {formik.touched.phone ? <p>{formik.errors.phone}</p> : ""}
                    <button
                      type="submit"
                      className="btn btn-info text-light w-100 rounded-2 mt-2"
                    >
                      Sign Up
                    </button>
                    {msg ? <p>{msg}</p> : null}
                  </form>
                  <p>
                    Already Have Account ? <a href="login">Login</a>
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
