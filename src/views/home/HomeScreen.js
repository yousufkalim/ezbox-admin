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
import AddHomeScreen from "./AddHomeScreen";
import EditHomeScreen from "./EditHomeScreen";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const HomeScreen = ({ status }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState({});

  let [home, setHome] = useState({
    text: "",
    image: "",
    yt_link: "",
  });

  useEffect(() => {
    getHome();
  }, []);

  const getHome = async () => {
    const data = await api("get", "/homeScreen");
    setData(data.home);
    console.log("====", data.home);
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setHome({
        text: item.text,
        text_font: item.text_font,
        image: item.image,
        yt_link: item.yt_link,
      });
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = () => {
    api("delete", "/homeScreen").then(() => {
      toast.success("HomeScreen Content deleted successfully");
      getHome();
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
                  <h3 className="mb-0">Home Screen</h3>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add Home Screen
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Text</th>
                    <th scope="col">Youtube URL</th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data).length > 0 ? (
                    <tr>
                      <td title={data.image}>
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                          >
                            {data.image ? (
                              <img
                                className="rounded-circle"
                                style={{ width: "100%", height: "100%" }}
                                alt="Image"
                                src={
                                  process.env.REACT_APP_SERVER_MEDIA_URL +
                                  data.image
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
                      <td title={data.yt_link}>
                        {data.yt_link?.length > 30
                          ? data.yt_link?.substring(0, 30) + "..."
                          : data.yt_link}
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
          <AddHomeScreen
            openModal={openModal}
            handleModal={handleModal}
            getHome={getHome}
          />
        )}
        {editModal && (
          <EditHomeScreen
            openModal={editModal}
            handleModal={handleEditModal}
            home={home}
            setHome={setHome}
            getHome={getHome}
          />
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
