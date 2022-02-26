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

const EditConsulting = ({
  openModal,
  handleModal,
  consulting,
  setConsulting,
  getConsulting,
}) => {
  const handleInput = (e) => {
    setConsulting({ ...consulting, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setConsulting({ ...consulting, [e.target.name]: "" });

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    api("post", "/image", formData).then((res) => {
      toast.success("Image uploaded successfully");
      setConsulting({ ...consulting, [e.target.name]: res.url });
    });
  };

  const handleOnChange = () => {
    setConsulting((prev) => ({ ...prev, contactbutton: !prev.contactbutton }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(consulting.text && consulting.textbottom)) {
      return toast.error("All fields are required");
    }

    if (!consulting.image) {
      return toast.error("Wait before the image to upload");
    }

    api("post", "/consulting ", consulting).then((res) => {
      toast.success("consulting  edited successfully");
      getConsulting();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Edit consulting
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
                            {consulting.image ? "" : "*"}
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
                    <FontPicker
                      data={consulting}
                      setData={setConsulting}
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
                            {consulting.text ? "" : "*"}{" "}
                          </span>
                          Text
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter consulting 's text here"
                          type="textarea"
                          value={consulting.text}
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
                            {consulting.textbottom ? "" : "*"}{" "}
                          </span>
                          Text Bottom
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter consulting 's textbottom here"
                          type="text"
                          value={consulting.textbottom}
                          name="textbottom"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <FontPicker
                      data={consulting}
                      setData={setConsulting}
                      fieldName="textbottom_font"
                    />
                  </Row>
                  <Row>
                    <Col lg="12" style={{ margin: "auto" }}>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id={`customCheck1${consulting.contactbutton}`}
                          className="custom-control-input"
                          checked={consulting.contactbutton}
                          onChange={handleOnChange}
                        />
                        <label
                          class="custom-control-label"
                          for={`customCheck1${consulting.contactbutton}`}
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

export default EditConsulting;
