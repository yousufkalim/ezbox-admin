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
import { tuple } from "antd/lib/_util/type";
// core components

const { Option } = Select;

const AddContact = ({ openModal, handleModal, getContact }) => {
  let [contact, setContact] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(contact.name && contact.number && contact.email && contact.message)) {
      return toast.error("All fields are required");
    }

    api("post", "/contact", contact).then((res) => {
      toast.success("contact added successfully");
      getContact();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Add contact
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
                            {contact.name ? "" : "*"}{" "}
                          </span>
                          Name
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter contact's name here"
                          type="text"
                          value={contact.name}
                          name="name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-phone"
                        >
                          <span style={{ color: "red" }}>
                            {contact.number ? "" : "*"}
                          </span>{" "}
                          Phone Number
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-phone"
                          placeholder="+33123456789"
                          type="text"
                          value={contact.number}
                          name="number"
                          onChange={handleInput}
                          maxLength={14}
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
                            {contact.email ? "" : "*"}{" "}
                          </span>
                          Email
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter contact's email here"
                          type="text"
                          value={contact.email}
                          name="email"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {contact.message ? "" : "*"}{" "}
                          </span>
                          message
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter contact's message here"
                          type="text"
                          value={contact.message}
                          name="message"
                          onChange={handleInput}
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

export default AddContact;
