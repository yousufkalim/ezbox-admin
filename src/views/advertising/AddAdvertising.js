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
  Label,
} from "reactstrap";
// core components

const { Option } = Select;

const AddAdvertising = ({ openModal, handleModal, getAdvertising }) => {
  let [advertising, setAdvertising] = useState({
    title: "",
    text: "",
    image: "",
    textbottom: "",
    contactbutton: "",
  });

  const handleInput = (e) => {
    setAdvertising({ ...advertising, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setAdvertising({ ...advertising, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (advertising.name == "") {
    //   return toast.error("Please enter user's name");
    // }

    // if (user.email == "") {
    //   return toast.error("Please enter email");
    // }
    // if (!(user.email.includes(".") && user.email.includes("@"))) {
    //   return toast.error("Please enter a valid email");
    // }
    // if (user.password == "") {
    //   return toast.error("Password is required");
    // }
    // if (user.password.length < 8) {
    //   return toast.error("Passwords should be of atleast 8 letters");
    // }
    // if (user.number == "") {
    //   return toast.error("Contact no. is required");
    // }

    api("post", "/advertising", advertising).then((res) => {
      toast.success("Advertising added successfully");
      getAdvertising();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Add a user
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-image"
                        >
                          <span style={{ color: "red" }}>
                            {advertising.image ? "" : "*"}
                          </span>{" "}
                          Add Image <i className="ni ni-album-2" />
                        </label>
                        <Input
                          className="form-control-file form"
                          id="input-image"
                          name="profile_pic"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="6" style={{ margin: "auto" }}>
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
                    <Col lg="6" style={{ margin: "auto" }}>
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
                          type="text"
                          value={advertising.text}
                          name="text"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6" style={{ margin: "auto" }}>
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
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          <span style={{ color: "red" }}>
                            {advertising.number ? "" : "*"}{" "}
                          </span>{" "}
                          Contact no.
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter advertising's contact here"
                          type="phone"
                          value={advertising.number}
                          name="number"
                          onChange={handleInput}
                          maxLength="11"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddAdvertising;
