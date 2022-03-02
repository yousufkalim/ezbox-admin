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
  Media,
} from "reactstrap";
import FontPicker from "components/FontPicker";
import layout1 from "assets/img/layouts/layout1.png";
import layout2 from "assets/img/layouts/layout2.png";
import layout3 from "assets/img/layouts/layout3.png";

// core components

const { Option } = Select;

const AddPages = ({ openModal, handleModal, getpages }) => {
  let [pages, setPages] = useState({
    title: "",
    route: "",
    layout: "",
  });

  const handleOnChange = () => {
    setPages((prev) => ({ ...prev, contactbutton: !prev.contactbutton }));
  };

  const handleInput = (e) => {
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
    if (!(pages.title && pages.route)) {
      return toast.error("All fields are required");
    }

    api("post", "/adverstising", pages).then((res) => {
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
                  {/* <Row>
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
                  </Row> */}

                  <Row>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {pages.title ? "" : "*"}{" "}
                          </span>
                          Page Title
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
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {pages.route ? "" : "*"}{" "}
                          </span>
                          Route
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter pages's route here"
                          type="text"
                          value={pages.route}
                          name="route"
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
                    <Col lg="12" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {pages.textbottom ? "" : "*"}{" "}
                          </span>
                          Select layout:
                        </label>
                      </FormGroup>
                    </Col>
                    <Table className="table table-borderless align-items-center">
                      <tr>
                        <td>
                          <Media className="align-items-center">
                            {/* <input
                              className="custom-control-input"
                              id="layout1"
                              name="layout-1"
                              type="radio"
                              checked={pages.radio}
                              onChange={handleOnChange}
                            />{" "} */}
                            <img
                              src={layout1}
                              height="50%"
                              width="50%"
                              alt="layout1"
                            />
                          </Media>
                        </td>
                        <td>
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
                              name="layout-3"
                              type="radio"
                              checked={pages.radio}
                              onChange={handleOnChange}
                            />{" "}
                            <img
                              src={layout3}
                              height="50%"
                              width="50%"
                              alt="layout1"
                            />
                          </Media>
                        </td>
                      </tr>
                    </Table>
                  </Row>
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
          <Button color="primary" onClick={handleSubmit}>
            Next
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddPages;
