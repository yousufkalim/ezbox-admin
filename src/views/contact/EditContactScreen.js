import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../api";
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

const EditContactScreen = ({ openModal, handleModal }) => {
  let [screenInfo, setScreenInfo] = useState({
    title: "",
    status: false,
    rank: "",
  });
  let [screenData, setScreenData] = useState(null);

  useEffect(() => {
    getScreenData();
  }, []);

  const getScreenData = async () => {
    const body = {
      path: "contact",
    };
    const data = await api("post", "/pages/get_one", body);
    setScreenData(data.data);
    setScreenInfo({
      title: data.data.name,
      status: data.data.is_active,
      rank: data.data.rank,
    });
  };

  const handleInput = (e) => {
    setScreenInfo({ ...screenInfo, [e.target.name]: e.target.value });
  };

  const handleActive = (e) => {
    const value = e.target.checked;
    setScreenInfo({ ...screenInfo, status: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!screenInfo.title) {
      return toast.error("Title is required");
    }

    const body = {
      name: screenInfo.title,
      is_active: screenInfo.status,
      rank: screenInfo.rank,
    };

    api("put", `/pages/${screenData._id}`, body).then((res) => {
      toast.success("Contact screen updated successfully.");
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Edit contact screen
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="8" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          <span style={{ color: "red" }}>
                            {screenInfo.title ? "" : "*"}{" "}
                          </span>
                          Title
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter product's title here"
                          type="text"
                          value={screenInfo.title}
                          name="title"
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
                            {screenInfo.rank ? "" : "*"}{" "}
                          </span>
                          Rank
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter page's rank here"
                          type="number"
                          value={screenInfo.rank}
                          name="rank"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="8" style={{ margin: "auto" }}>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id={`customCheck1`}
                          checked={screenInfo.status}
                          className="custom-control-input"
                          onChange={handleActive}
                        />
                        <label
                          class="custom-control-label"
                          for={`customCheck1`}
                        >
                          Active
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
            Save
          </Button>
          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditContactScreen;
