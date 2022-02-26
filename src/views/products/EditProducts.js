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
// core components

const { Option } = Select;

const EditProducts = ({
  openModal,
  handleModal,
  product,
  setProduct,
  getProducts,
}) => {
  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    api("post", "/image", formData).then((res) => {
      toast.success("Image uploaded successfully");
      setProduct({ ...product, [e.target.name]: res.url });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(product.title && product.description && product.image)) {
      return toast.error("All fields are required");
    }
    api("put", `/product/${product._id}`, product).then((res) => {
      toast.success("Product edited successfully");
      getProducts();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Edit product
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
                            {product.image ? "" : "*"}
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
                    <Col lg="12" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {product.title ? "" : "*"}{" "}
                          </span>
                          Title
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter product's title here"
                          type="text"
                          value={product.title}
                          name="title"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {product.text ? "" : "*"}{" "}
                          </span>
                          Description
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter product's description here"
                          type="textarea"
                          value={product.description}
                          name="description"
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
            Update
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditProducts;
