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
import AddProducts from "./AddProducts";
import EditProducts from "./EditProducts";
import EditProductsScreen from "./EditProductsScreen";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const Products = ({ status }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editProductsScreenModal, setEditProductsScreenModal] = useState(false);
  const [data, setData] = useState([]);
  let [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = await api("get", "/product");
    setData(data.products);
    console.log("====", data.products);
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setProduct({
        _id: item._id,
        title: item.title,
        title_font: item.title_font,
        description: item.description,
        description_font: item.description_font,
        image: item.image,
      });
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleEditProductsScreenModal = () => {
    setEditProductsScreenModal((open) => !open);
    return openModal;
  };

  const handleDelete = (id) => {
    api("delete", `/product/${id}`).then(() => {
      toast.success("Product deleted successfully");
      getProducts();
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
                  <h3 className="mb-0">Products</h3>
                  <div>
                    <Button
                      color="primary"
                      onClick={handleEditProductsScreenModal}
                      size="md"
                    >
                      Edit Screen
                    </Button>
                    <Button color="primary" onClick={handleModal} size="md">
                      <i className="ni ni-fat-add"></i>
                      Add Product
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((item) => {
                      return (
                        <tr>
                          <td title={item.image}>
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href="#pablo"
                              >
                                {item.image ? (
                                  <img
                                    className="rounded-circle"
                                    style={{ width: "100%", height: "100%" }}
                                    alt="logo"
                                    src={
                                      process.env.REACT_APP_SERVER_MEDIA_URL +
                                      item.image
                                    }
                                  />
                                ) : (
                                  <i className="ni ni-circle-08" />
                                )}
                              </a>
                            </Media>
                          </td>
                          <td title={item.title}>
                            {item.title?.length > 30
                              ? item.title?.substring(0, 30) + "..."
                              : item.title}
                          </td>
                          <td title={item.description}>
                            {item.description?.length > 30
                              ? item.description?.substring(0, 30) + "..."
                              : item.description}
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
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <DropdownItem
                                  href="#pablo"
                                  onClick={() => handleEditModal(item)}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  className="text-danger"
                                  onClick={() => handleDelete(item._id)}
                                >
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      );
                    })
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
          <AddProducts
            openModal={openModal}
            handleModal={handleModal}
            getProducts={getProducts}
          />
        )}
        {editModal && (
          <EditProducts
            openModal={editModal}
            handleModal={handleEditModal}
            product={product}
            setProduct={setProduct}
            getProducts={getProducts}
          />
        )}
        {editProductsScreenModal && (
          <EditProductsScreen
            openModal={editProductsScreenModal}
            handleModal={handleEditProductsScreenModal}
          />
        )}
      </Container>
    </>
  );
};

export default Products;
