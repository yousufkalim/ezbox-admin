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

const AddNavigation = ({ openModal, handleModal, getNavigation }) => {
  let [navigation, setNavigation] = useState({
    blog: "",
    forum: "",
    logo: "",
    facebook: "",
    instagram: "",
    whatsapp: "",
    linkedIn: "",
    twitter: "",
    tiktok: "",
    email: "",
  });

  const handleInput = (e) => {
    setNavigation({ ...navigation, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    api("post", "/image", formData).then((res) => {
      toast.success("Image uploaded successfully");
      setNavigation({ ...navigation, [e.target.name]: res.url });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!navigation.blog) {
      return toast.error("Blog is  required");
    }
    if (!navigation.forum) {
      return toast.error("Forum is  required");
    }
    if (!navigation.logo) {
      return toast.error("Logo is  required");
    }

    api("post", "/   navigation", navigation).then((res) => {
      toast.success("   navigation added successfully");
      getNavigation();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Add Navigation
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="logo">
                          <span style={{ color: "red" }}>
                            {navigation.logo ? "" : "*"}
                          </span>{" "}
                          Logo <i className="ni ni-album-2" />
                        </label>
                        <Input
                          className="form-control-file form"
                          id="logo"
                          name="logo"
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
                            {navigation.blog ? "" : "*"}{" "}
                          </span>
                          blog
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter navigation's blog here"
                          type="text"
                          value={navigation.blog}
                          name="blog"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {navigation.forum ? "" : "*"}{" "}
                          </span>
                          Forum
                        </label>{" "}
                        <Input
                          className="form-control-alternative forum-default"
                          required={true}
                          placeholder="Enter navigation's forum here"
                          type="text"
                          value={navigation.forum}
                          name="forum"
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
                            {navigation.facebook ? "" : "*"}{" "}
                          </span>
                          Facebook
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter navigation's facebook here"
                          type="text"
                          value={navigation.facebook}
                          name="facebook"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {navigation.instagram ? "" : "*"}{" "}
                          </span>
                          Instagram
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter navigation's instagram here"
                          type="text"
                          value={navigation.instagram}
                          name="instagram"
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
                            {navigation.whatsapp ? "" : "*"}{" "}
                          </span>
                          Whatsapp
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter navigation's whatsapp here"
                          type="text"
                          value={navigation.whatsapp}
                          name="whatsapp"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {navigation.linkedIn ? "" : "*"}{" "}
                          </span>
                          LinkedIn
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter navigation's linkedIn here"
                          type="text"
                          value={navigation.linkedIn}
                          name="linkedIn"
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
                            {navigation.twitter ? "" : "*"}{" "}
                          </span>
                          Twitter
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter navigation's twitter here"
                          type="text"
                          value={navigation.twitter}
                          name="twitter"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {navigation.tiktok ? "" : "*"}{" "}
                          </span>
                          Tiktok
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter navigation's tiktok here"
                          type="text"
                          value={navigation.tiktok}
                          name="tiktok"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    {" "}
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {navigation.email ? "" : "*"}{" "}
                          </span>
                          email
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter navigation's email here"
                          type="email"
                          value={navigation.email}
                          name="email"
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

export default AddNavigation;
