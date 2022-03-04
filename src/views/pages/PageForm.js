import {
  ModalBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
  Label,
  Media,
} from "reactstrap";

import layout1 from "assets/img/layouts/layout1.png";
import layout2 from "assets/img/layouts/layout2.png";
import layout3 from "assets/img/layouts/layout3.png";

const PageForm = ({ page, setPage }) => {
  const handleInput = e => {
    setPage({ ...page, [e.target.name]: e.target.value });
  };

  return (
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
                        {page.name ? "" : "*"}{" "}
                      </span>
                      Page Title
                    </label>{" "}
                    <Input
                      className="form-control-alternative text-default"
                      required={true}
                      placeholder="Enter page's title here"
                      type="text"
                      value={page.name}
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
                        {page.path ? "" : "*"}{" "}
                      </span>
                      Path
                    </label>{" "}
                    <Input
                      className="form-control-alternative text-default"
                      required={true}
                      placeholder="Enter page's path here"
                      type="text"
                      value={page.path}
                      name="path"
                      onChange={handleInput}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <Label for="exampleSelect" className="form-control-label">
                      <span style={{ color: "red" }}>
                        {page.rel ? "" : "*"}
                      </span>{" "}
                      Select Page
                    </Label>
                    <Input
                      id="exampleSelect"
                      name="rel"
                      className="form-control-alternative"
                      type="select"
                      value={page.rel}
                      onChange={handleInput}
                    >
                      <option value="external" selected>
                        External
                      </option>
                      <option value="internal">Internal</option>
                    </Input>
                  </FormGroup>
                  <Col lg="6" style={{ margin: "auto" }}>
                    <FormGroup>
                      <label className="form-control-label">
                        {" "}
                        <span style={{ color: "red" }}>
                          {page.rank ? "" : "*"}{" "}
                        </span>
                        Rank
                      </label>{" "}
                      <Input
                        className="form-control-alternative text-default"
                        required={true}
                        placeholder="Enter page's rank here"
                        type="number"
                        value={page.rank}
                        name="rank"
                        onChange={handleInput}
                      />
                    </FormGroup>
                  </Col>
                </Col>
              </Row>
              {page.rel === "internal" && (
                <div>
                  <Row>
                    <Col lg="12" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {page.layout_type ? "" : "*"}{" "}
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
                                page.layout_type === "type1"
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
                        name="layout_type"
                        type="radio"
                        value="type1"
                        // hidden={true}
                        checked={page.layout_type === "type1"}
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
                                page.layout_type === "type2"
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
                        name="layout_type"
                        type="radio"
                        value="type2"
                        // hidden={true}

                        checked={page.layout_type === "type2"}
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
                                page.layout_type === "type3"
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
                        name="layout_type"
                        type="radio"
                        // hidden={true}
                        checked={page.layout === "type3"}
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
                            checked={page.radio}
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
                              checked={page.radio}
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
                          id={`customCheck1${page.contactbutton}`}
                          checked={page.contactbutton}
                          className="custom-control-input"
                          onChange={handleOnChange}
                        />
                        <label
                          class="custom-control-label"
                          for={`customCheck1${page.contactbutton}`}
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
  );
};

export default PageForm;
