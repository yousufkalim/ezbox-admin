import { useState } from "react";
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
  Table,
  Label,
  Media,
} from "reactstrap";
import FontPicker from "components/FontPicker";
import layout1 from "assets/img/layouts/layout1.png";
import layout2 from "assets/img/layouts/layout2.png";
import layout3 from "assets/img/layouts/layout3.png";

// core components

const { Option } = Select;

const AddPages = ({ openModal, handleModal, getpages, pages, setPages }) => {
  const handleOnChange = () => {
    setPages((prev) => ({ ...prev, contactbutton: !prev.contactbutton }));
  };

  const handleInput = (e) => {
    console.log(e.target.name, e.target.value);
    setPages({ ...pages, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    api("post", "/image", formData).then((res) => {
      toast.success("Image uploaded successfully");
      setPages({ ...pages, [e.target.name]: res.url });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(pages.name && pages.path)) {
      return toast.error("All fields are required");
    }

    api("post", "/pages", pages).then((res) => {
      toast.success("pages added successfully");
      getpages();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Add Page
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {pages.name ? "" : "*"}{" "}
                          </span>
                          Page Title
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter pages's title here"
                          type="text"
                          value={pages.name}
                          name="name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {pages.path ? "" : "*"}{" "}
                          </span>
                          Path
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter pages's path here"
                          type="text"
                          value={pages.path}
                          name="path"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <Row>
                    <FontPicker
                      data={pages}
                      setData={setPages}
                      fieldName="text_font"
                      width="12"
                    />
                  </Row> */}

                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <Label
                          for="exampleSelect"
                          className="form-control-label"
                        >
                          <span style={{ color: "red" }}>
                            {pages.rel ? "" : "*"}
                          </span>{" "}
                          Select Page
                        </Label>
                        <Input
                          id="exampleSelect"
                          name="rel"
                          className="form-control-alternative"
                          type="select"
                          value={pages.rel}
                          onChange={handleInput}
                        >
                          <option value="External" selected>
                            External
                          </option>
                          <option value="Internal">Internal</option>
                          <option value="Contacts">Contacts</option>
                          <option value="Products">Products</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  {pages.rel === "Internal" && (
                    <div>
                      <Row>
                        <Col lg="12" style={{ margin: "auto" }}>
                          <FormGroup>
                            <label className="form-control-label">
                              {" "}
                              <span style={{ color: "red" }}>
                                {pages.layout ? "" : "*"}{" "}
                              </span>
                              Select layout:
                            </label>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4" style={{ margin: "auto" }}>
                          <label htmlFor="layout1">
                            <Media>
                              <img
                                src={layout1}
                                height="50%"
                                width="50%"
                                alt="layout1"
                                style={{
                                  margin: "auto",
                                  border:
                                    pages.layout === "type1"
                                      ? "2px solid #008080"
                                      : "none",
                                  cursor: "pointer",
                                }}
                              />
                            </Media>
                          </label>
                          <input
                            className="custom-control-input"
                            id="layout1"
                            name="layout"
                            type="radio"
                            value="type1"
                            // hidden={true}
                            checked={pages.layout === "type1"}
                            onChange={handleInput}
                          />
                        </Col>

                        <Col lg="4" style={{ margin: "auto" }}>
                          <label htmlFor="layout2">
                            <Media>
                              <img
                                src={layout2}
                                height="50%"
                                width="50%"
                                alt="layout2"
                                style={{
                                  margin: "auto",
                                  border:
                                    pages.layout === "type2"
                                      ? "2px solid #008080"
                                      : "none",
                                  cursor: "pointer",
                                }}
                              />
                            </Media>
                          </label>
                          <input
                            className="custom-control-input"
                            id="layout2"
                            name="layout"
                            type="radio"
                            value="type2"
                            // hidden={true}

                            checked={pages.layout === "type2"}
                            onChange={handleInput}
                          />
                        </Col>

                        <Col lg="4" style={{ margin: "auto" }}>
                          <label htmlFor="layout3">
                            <Media>
                              <img
                                src={layout3}
                                height="50%"
                                width="50%"
                                alt="layout3"
                                style={{
                                  margin: "auto",
                                  border:
                                    pages.layout === "type3"
                                      ? "2px solid #008080"
                                      : "none",
                                  cursor: "pointer",
                                }}
                              />
                            </Media>
                          </label>
                          <input
                            className="custom-control-input"
                            id="layout3"
                            value="type3"
                            name="layout"
                            type="radio"
                            // hidden={true}
                            checked={pages.layout === "type3"}
                            onChange={handleInput}
                          />
                        </Col>
                      </Row>
                    </div>
                  )}
                  {/* <Table className="table table-borderless align-items-center">
                      <tr>
                        <td></td>
                        <td>
                          <input
                            className="custom-control-input"
                            id="layout2"
                            name="layout"
                            type="radio"
                            checked={pages.radio}
                            onChange={handleOnChange}
                          />{" "}
                          <Media className="align-items-center">
                            <img
                              src={layout2}
                              height="50%"
                              width="50%"
                              alt="layout2"
                            />
                          </Media>
                        </td>
                        <td>
                          <Media className="align-items-center">
                            <input
                              className="custom-control-input"
                              id="layout3"
                              name="layout"
                              type="radio"
                              checked={pages.radio}
                              onChange={handleOnChange}
                            />{" "}
                            <img
                              src={layout3}
                              height="50%"
                              width="50%"
                              alt="layout3"
                            />
                          </Media>
                        </td>
                      </tr>
                    </Table> */}

                  {/* <Row>
                    <Col lg="12" style={{ margin: "auto" }}>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id={`customCheck1${pages.contactbutton}`}
                          checked={pages.contactbutton}
                          className="custom-control-input"
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
                  </Row> */}
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          {pages.rel === "Internal" ? (
            <Button color="primary" onClick={handleSubmit}>
              Next
            </Button>
          ) : (
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddPages;
