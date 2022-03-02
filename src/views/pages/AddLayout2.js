import { toast } from "react-toastify";
import api from "../../api";
import { ModalBody, FormGroup, Form, Input, Row, Col } from "reactstrap";
import FontPicker from "components/FontPicker";
// core components

const AddLayout2 = ({ layout, setLayout }) => {
  const handleInput = e => {
    setLayout({ ...layout, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    api("post", "/image", formData).then(res => {
      toast.success("Image uploaded successfully");
      setLayout({ ...layout, [e.target.name]: res.url });
    });
  };

  return (
    <ModalBody>
      <Row>
        <Col>
          <Form>
            <div className="px-lg-4">
              <Row>
                <Col lg="4">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="leftImg">
                      <span style={{ color: "red" }}>
                        {layout.leftImg ? "" : "*"}
                      </span>{" "}
                      Left Image <i className="ni ni-album-2" />
                    </label>
                    <Input
                      className="form-control-file form"
                      id="image"
                      name="leftImg"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="centerImg">
                      <span style={{ color: "red" }}>
                        {layout.centerImg ? "" : "*"}
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
                    <label className="form-control-label" htmlFor="rightImg">
                      <span style={{ color: "red" }}>
                        {layout.rightImg ? "" : "*"}
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
                <FontPicker
                  data={layout}
                  setData={setLayout}
                  fieldName="text_font"
                  width="12"
                />
              </Row>
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label className="form-control-label">
                      {" "}
                      <span style={{ color: "red" }}>
                        {layout.text ? "" : "*"}{" "}
                      </span>
                      Text
                    </label>{" "}
                    <Input
                      className="form-control-alternative text-default"
                      required={true}
                      placeholder="Enter layout's text here"
                      type="textarea"
                      value={layout.text}
                      name="text"
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
  );
};

export default AddLayout2;
