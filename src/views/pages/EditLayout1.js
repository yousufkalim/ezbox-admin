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

const EditLayout1 = ({
  openModal,
  handleModal,
  advertising,
  setAdvertising,
  getAdvertising,
}) => {
  const handleInput = (e) => {
    setAdvertising({ ...advertising, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setAdvertising({ ...advertising, [e.target.name]: "" });

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    api("post", "/image", formData).then((res) => {
      toast.success("Image uploaded successfully");
      setAdvertising({ ...advertising, [e.target.name]: res.url });
    });
  };

  const handleOnChange = () => {
    setAdvertising((prev) => ({ ...prev, contactbutton: !prev.contactbutton }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(advertising.title && advertising.text && advertising.textbottom)) {
      return toast.error("All fields are required");
    }

    if (
      !(advertising.leftImg && advertising.rightImg && advertising.centerImg)
    ) {
      return toast.error("Wait before the image to upload");
    }

    api("post", "/advertising", advertising).then((res) => {
      toast.success("Advertising edited successfully");
      getAdvertising();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Edit Advertising
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
                            {advertising.leftImg ? "" : "*"}
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
                            {advertising.centerImg ? "" : "*"}
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
                            {advertising.rightImg ? "" : "*"}
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
                            {advertising.title ? "" : "*"}{" "}
                          </span>
                          Title
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter advertising's title here"
                          type="text"
                          value={advertising.title}
                          name="title"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <FontPicker
                      data={advertising}
                      setData={setAdvertising}
                      fieldName="title_font"
                    />
                  </Row>
                  <Row>
                    <FontPicker
                      data={advertising}
                      setData={setAdvertising}
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
                            {advertising.text ? "" : "*"}{" "}
                          </span>
                          Text
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter advertising's text here"
                          type="textarea"
                          value={advertising.text}
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
                            {advertising.textbottom ? "" : "*"}{" "}
                          </span>
                          Text Bottom
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter advertising's textbottom here"
                          type="text"
                          value={advertising.textbottom}
                          name="textbottom"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <FontPicker
                      data={advertising}
                      setData={setAdvertising}
                      fieldName="textbottom_font"
                    />
                  </Row>
                  <Row>
                    <Col lg="12" style={{ margin: "auto" }}>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id={`customCheck1${advertising.contactbutton}`}
                          className="custom-control-input"
                          checked={advertising.contactbutton}
                          onChange={handleOnChange}
                        />
                        <label
                          class="custom-control-label"
                          for={`customCheck1${advertising.contactbutton}`}
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

export default EditLayout1;
