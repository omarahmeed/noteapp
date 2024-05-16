import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useRecoilState } from "recoil";
import { noteState } from "../Atoms/noteAtom.js";
import Note from "../Note/Note.jsx";

export default function Home() {
  let [notelength, setnotelength] = useRecoilState(noteState);
  let [allNotes, setAllNotes] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // function validate(values) {
  //   console.log(values);
  // }
  function addNote(values) {
    // console.log(`3b8ny${localStorage.getItem("usertoken")}`);
    axios
      .post("https://note-sigma-black.vercel.app/api/v1/notes", values, {
        headers: {
          token: `3b8ny__${localStorage.getItem("usertoken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        getNotes();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        handleClose();
      });
  }
  function getNotes() {
    // console.log(`3b8ny${localStorage.getItem("usertoken")}`);
    axios
      .get("https://note-sigma-black.vercel.app/api/v1/notes", {
        headers: {
          token: `3b8ny__${localStorage.getItem("usertoken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setnotelength(res.data.notes.length);
        setAllNotes(res.data.notes);
        console.log(allNotes);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getNotes();
  }, []);

  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },

    onSubmit: addNote,
  });
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>add note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control my-2"
              id="title"
              name="title"
              type="text"
              placeholder="enter your title"
            />
            <textarea
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control my-2"
              name="content"
              id="content"
              cols="30"
              rows="10"
              placeholder="enter content "
            ></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            add note
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="overflow-hidden">
        <div className="row">
          <div className="col-2">
            <div className="position-fixed col-lg-2">
              <Sidebar />
            </div>
          </div>

          <div className="col-10 px-lg-5 px-2 py-5">
            <div className="text-end me-2">
              <button
                variant="primary"
                onClick={handleShow}
                className="btn btn-info text-white"
              >
                <i className="fa-solid fa-plus"></i> Add Note
              </button>
            </div>
            <div className="row ">
              {allNotes.map((note) => {
                return (
                  <Note key={note._id} note={note} getusernotes={getNotes} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
