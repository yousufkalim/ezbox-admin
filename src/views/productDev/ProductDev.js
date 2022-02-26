/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "api";
import { Store, UpdateStore } from "StoreContext";
import {
  Badge,
  Card,
  CardHeader,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
} from "reactstrap";

// core components
import AddProductDev from "./AddProductDev";
import EditProductDev from "./EditProductDev";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const ProductDev = ({ status }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const history = useHistory();
  const [data, setData] = useState({});
  const [productDev, setProductDev] = useState({
    _id: "",
    text: "",
    leftImg: "",
    centerImg: "",
    rightImg: "",
  });

  useEffect(() => {
    getProductDev();
  }, []);

  const getProductDev = async () => {
    const data = await api("get", "/productDev");
    setData(data.productDev);
    console.log("====", data.productDev);
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setProductDev({
        text: item.text,
        text_font: item.text_font,
        leftImg: item.leftImg,
        centerImg: item.centerImg,
        rightImg: item.rightImg,
      });
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = () => {
    api("delete", "/productDev").then(() => {
      toast.success("Product Dev deleted successfully");
      getProductDev();
    });
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between ">
                  <h3 className="mb-0">Product Development</h3>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add Product Development
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Left Image</th>
                    <th scope="col">Center Image</th>
                    <th scope="col">Right Image</th>
                    <th scope="col">Text</th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data).length > 0 ? (
                    <tr>
                      <td title={data.leftImg}>
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                          >
                            {data.leftImg ? (
                              <img
                                className="rounded-circle"
                                style={{ width: "100%", height: "100%" }}
                                alt="logo"
                                src={
                                  process.env.REACT_APP_SERVER_MEDIA_URL +
                                  data.leftImg
                                }
                              />
                            ) : (
                              <i className="ni ni-circle-08" />
                            )}
                          </a>
                        </Media>
                      </td>
                      <td title={data.centerImg}>
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                          >
                            {data.centerImg ? (
                              <img
                                className="rounded-circle"
                                style={{ width: "100%", height: "100%" }}
                                alt="logo"
                                src={
                                  process.env.REACT_APP_SERVER_MEDIA_URL +
                                  data.centerImg
                                }
                              />
                            ) : (
                              <i className="ni ni-circle-08" />
                            )}
                          </a>
                        </Media>
                      </td>
                      <td title={data.rightImg}>
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                          >
                            {data.rightImg ? (
                              <img
                                className="rounded-circle"
                                style={{ width: "100%", height: "100%" }}
                                alt="logo"
                                src={
                                  process.env.REACT_APP_SERVER_MEDIA_URL +
                                  data.rightImg
                                }
                              />
                            ) : (
                              <i className="ni ni-circle-08" />
                            )}
                          </a>
                        </Media>
                      </td>
                      <td title={data.text}>
                        {data.text?.length > 30
                          ? data.text?.substring(0, 30) + "..."
                          : data.text}
                      </td>

                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            {/* {item.test_conducted && (
                                <DropdownItem
                                  onClick={() =>
                                    history.push(`/admin/users/${item._id}`)
                                  }
                                >
                                  View
                                </DropdownItem>
                              )} */}
                            <DropdownItem
                              href="#pablo"
                              onClick={() => handleEditModal(data)}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              className="text-danger"
                              onClick={() => handleDelete(data._id)}
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td>N/A</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        {openModal && (
          <AddProductDev
            openModal={openModal}
            handleModal={handleModal}
            getProductDev={getProductDev}
          />
        )}
        {editModal && (
          <EditProductDev
            openModal={editModal}
            handleModal={handleEditModal}
            productDev={productDev}
            setProductDev={setProductDev}
            getProductDev={getProductDev}
          />
        )}
      </Container>
    </>
  );
};

export default ProductDev;
