import React, { useState } from "react";
import "./Note.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import axios from "axios";
export default function Note({ note, getusernotes }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function updateNote(values) {
    // console.log(`3b8ny${localStorage.getItem("usertoken")}`);
    axios
      .put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
        values,
        {
          headers: {
            token: `3b8ny__${localStorage.getItem("usertoken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getusernotes();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        handleClose();
      });
  }
  function delNote() {
    // console.log(`3b8ny${localStorage.getItem("usertoken")}`);
    axios
      .delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,

        {
          headers: {
            token: `3b8ny__${localStorage.getItem("usertoken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getusernotes();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        handleClose();
      });
  }
  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },

    onSubmit: updateNote,
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
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="col-md-6 g-3">
        <div>
          <Card>
            <Card.Body>
              <Card.Title>{note.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle>
              <Card.Text>{note.content}</Card.Text>
              <button
                variant="primary"
                onClick={handleShow}
                className="btn btn-info me-2"
              >
                update
              </button>
              <button onClick={delNote} className="btn btn-info me-2">
                delete
              </button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
