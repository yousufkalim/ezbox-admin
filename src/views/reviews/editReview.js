import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import { Select } from "antd";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import FontPicker from "components/FontPicker";
// core components

const { Option } = Select;

const EditReview = ({
  openModal,
  handleModal,
  review,
  setReview,
  getReviews,
}) => {
  const handleInput = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setReview({ ...review, [e.target.name]: "" });

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    api("post", "/image", formData).then((res) => {
      toast.success("Image uploaded successfully");
      setReview({ ...review, [e.target.name]: res.url });
    });
  };

  const handleOnChange = () => {
    setReview((prev) => ({ ...prev, contactbutton: !prev.contactbutton }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(review.name && review.message)) {
      return toast.error("All fields are required");
    }

    if (!review.image) {
      return toast.error("Wait before the image to upload");
    }

    if (!review.rating) {
      return toast.error("Rating should be in number");
    }

    api("put", `/reviews/${review._id}`, review).then((res) => {
      toast.success("review  edited successfully");
      getReviews();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Edit review
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="image">
                          <span style={{ color: "red" }}>
                            {review.image ? "" : "*"}
                          </span>{" "}
                          Image <i className="ni ni-album-2" />
                        </label>
                        <Input
                          className="form-control-file form"
                          id="image"
                          name="image"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="4" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {review.name ? "" : "*"}{" "}
                          </span>
                          Name
                        </label>{" "}
                        <Input
                          className="form-control-alternative name-default"
                          required={true}
                          placeholder="Enter review's name here"
                          type="text"
                          value={review.name}
                          name="name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <FontPicker
                      data={review}
                      setData={setReview}
                      fieldName="name_font"
                    />
                    <Col lg="4" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {review.rating ? "" : "*"}{" "}
                          </span>
                          Rating
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter review's rating here"
                          type="number"
                          value={review.rating}
                          name="rating"
                          onChange={handleInput}
                          max={5}
                        />
                      </FormGroup>
                    </Col>{" "}
                  </Row>
                  <Row>
                    <Col lg="12" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {review.message ? "" : "*"}{" "}
                          </span>
                          Message
                        </label>{" "}
                        <Input
                          className="form-control-alternative name-default"
                          required={true}
                          placeholder="Enter review's message here"
                          type="text"
                          value={review.message}
                          name="message"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <FontPicker
                      data={review}
                      setData={setReview}
                      fieldName="message_font"
                      width="12"
                    />
                  </Row>
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Update
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditReview;
