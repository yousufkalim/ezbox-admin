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

const EditPages = ({ openModal, handleModal, pages, setPages, getPages }) => {
  const handleInput = (e) => {
    setPages({ ...pages, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setPages({ ...pages, [e.target.name]: "" });

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    api("post", "/image", formData).then((res) => {
      toast.success("Image uploaded successfully");
      setPages({ ...pages, [e.target.name]: res.url });
    });
  };

  const handleOnChange = () => {
    setPages((prev) => ({ ...prev, contactbutton: !prev.contactbutton }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(pages.title && pages.text && pages.textbottom)) {
      return toast.error("All fields are required");
    }

    if (!(pages.leftImg && pages.rightImg && pages.centerImg)) {
      return toast.error("Wait before the image to upload");
    }

    api("post", "/advertising", pages).then((res) => {
      toast.success("pages edited successfully");
      getPages();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Edit pages
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="leftImg">
                          <span style={{ color: "red" }}>
                            {pages.leftImg ? "" : "*"}
                          </span>{" "}
                          Left Image <i className="ni ni-album-2" />
                        </label>
                        <Input
                          className="form-control-file form"
                          id="leftImg"
                          name="leftImg"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="centerImg"
                        >
                          <span style={{ color: "red" }}>
                            {pages.centerImg ? "" : "*"}
                          </span>{" "}
                          Center Image <i className="ni ni-album-2" />
                        </label>
                        <Input
                          className="form-control-file form"
                          id="centerImg"
                          name="centerImg"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="rightImg"
                        >
                          <span style={{ color: "red" }}>
                            {pages.rightImg ? "" : "*"}
                          </span>{" "}
                          Right Image <i className="ni ni-album-2" />
                        </label>
                        <Input
                          className="form-control-file form"
                          id="rightImg"
                          name="rightImg"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="8" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {pages.title ? "" : "*"}{" "}
                          </span>
                          Title
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter pages's title here"
                          type="text"
                          value={pages.title}
                          name="title"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <FontPicker
                      data={pages}
                      setData={setPages}
                      fieldName="title_font"
                    />
                  </Row>
                  <Row>
                    <FontPicker
                      data={pages}
                      setData={setPages}
                      fieldName="text_font"
                      width="12"
                    />
                  </Row>
                  <Row>
                    <Col lg="12" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {pages.text ? "" : "*"}{" "}
                          </span>
                          Text
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter pages's text here"
                          type="textarea"
                          value={pages.text}
                          name="text"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="8" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {pages.textbottom ? "" : "*"}{" "}
                          </span>
                          Text Bottom
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter pages's textbottom here"
                          type="text"
                          value={pages.textbottom}
                          name="textbottom"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <FontPicker
                      data={pages}
                      setData={setPages}
                      fieldName="textbottom_font"
                    />
                  </Row>
                  <Row>
                    <Col lg="12" style={{ margin: "auto" }}>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id={`customCheck1${pages.contactbutton}`}
                          className="custom-control-input"
                          checked={pages.contactbutton}
                          onChange={handleOnChange}
                        />
                        <label
                          class="custom-control-label"
                          for={`customCheck1${pages.contactbutton}`}
                        >
                          Contact Button
                        </label>
                      </div>
                    </Col>
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

export default EditPages;
