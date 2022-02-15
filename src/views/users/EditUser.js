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
} from "reactstrap";
// core components

const { Option } = Select;

const EditUser = ({ openModal, handleModal, user, setUser, getUsers }) => {
  let [skills] = useState([
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node",
    "Express",
  ]);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSkillsInput = (value) => {
    setUser({ ...user, skills: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.department || !user.skills) {
      toast.error("All fields are required");
    } else {
      api("post", "/users", user).then((res) => {
        toast.success("user added successfully");
        getUsers();
        handleModal();
      });
    }
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Edit a user
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Name</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter user's name here"
                          type="text"
                          value={user.name}
                          name="name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Email</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter user's email here"
                          type="email"
                          value={user.email}
                          name="email"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Department</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          type="select"
                          value={user.department}
                          name="department"
                          onChange={handleInput}
                        >
                          <option value="">Select a department</option>
                          <option value="MERN">MERN</option>
                          <option value="RN">React Native</option>
                          <option value="dotNET">.NET</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Skills</label>
                        <Select
                          className="form-control-alternative text-default"
                          mode="multiple"
                          allowClear
                          style={{ width: "100%" }}
                          placeholder="Select user's skill"
                          defaultValue={user.skills}
                          onChange={handleSkillsInput}
                        >
                          {skills.map((skill) => (
                            <Option key={skill}>{skill}</Option>
                          ))}
                        </Select>
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
            Update
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditUser;
