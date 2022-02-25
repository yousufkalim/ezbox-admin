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
import AddReview from "./AddReview";
import EditReview from "./EditReview";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const Reviews = ({ status }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState([]);
  const [review, setReview] = useState({
    name: "",
    image: "",
    rating: "",
    message: true,
  });

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    const data = await api("get", "/reviews");
    setData(data.reviews);
    console.log("====", data);
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setReview({
        _id: item._id,
        name: item.name,
        image: item.image,
        message: item.message,
        rating: item.rating,
      });
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = () => {
    api("delete", "/reviews").then(() => {
      toast.success("review deleted successfully");
      getReviews();
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
                  <h3 className="mb-0">Review</h3>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add Review
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Message</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    return (
                      <tr>
                        <td title={item.name}>
                          {item.name?.length > 30
                            ? item.name?.substring(0, 30) + "..."
                            : item.name}
                        </td>
                        <td title={item.rating}>{item.rating}</td>
                        <td title={item.message}>
                          {item.message?.length > 30
                            ? item.message?.substring(0, 30) + "..."
                            : item.message}
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
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        {openModal && (
          <AddReview
            openModal={openModal}
            handleModal={handleModal}
            getReviews={getReviews}
          />
        )}
        {editModal && (
          <EditReview
            openModal={editModal}
            handleModal={handleEditModal}
            review={review}
            setReview={setReview}
            getReviews={getReviews}
          />
        )}
      </Container>
    </>
  );
};

export default Reviews;
