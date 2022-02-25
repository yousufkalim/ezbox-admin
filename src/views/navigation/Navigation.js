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
import AddNavigation from "./AddNavigation";
import EditNavigation from "./EditNavigation";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const Navigation = ({ status }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState({});
  const [navigation, setNavigation] = useState({
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

  useEffect(() => {
    getnavigation();
  }, []);

  const getnavigation = async () => {
    const data = await api("get", "/navigation");
    setData(data.navigation);
    console.log("====", data.navigation);
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setNavigation({
        blog: item.blog,
        forum: item.forum,
        logo: item.logo,
        facebook: item.facebook,
        instagram: item.instagram,
        whatsapp: item.whatsapp,
        linkedIn: item.linkedIn,
        twitter: item.linkedIn,
        tiktok: item.tiktok,
        email: item.email,
      });
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = () => {
    api("delete", "/navigation").then(() => {
      toast.success("navigation deleted successfully");
      getnavigation();
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
                  <h3 className="mb-0">Navigation</h3>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add Navigation
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Logo</th>
                    <th scope="col">Blog</th>
                    <th scope="col">Email</th>
                    <th scope="col">Forum</th>
                    <th scope="col">Facebook</th>
                    <th scope="col">Instagram</th>
                    <th scope="col">Whatsapp</th>
                    <th scope="col">LinkedIn</th>
                    <th scope="col">Twitter</th>
                    <th scope="col">tiktok</th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data).length > 0 ? (
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm" title={data.logo}>
                              {data.logo?.length > 30
                                ? data.logo?.substring(0, 30) + "..."
                                : data.logo}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td title={data.blog}>
                        {data.blog?.length > 30
                          ? data.blog?.substring(0, 30) + "..."
                          : data.blog}
                      </td>
                      <td title={data.email}>
                        {data.email?.length > 30
                          ? data.email?.substring(0, 30) + "..."
                          : data.email}
                      </td>{" "}
                      <td title={data.forum}>
                        {data.forum?.length > 30
                          ? data.forum?.substring(0, 30) + "..."
                          : data.forum}
                      </td>
                      <td title={data.facebook}>
                        {data.facebook?.length > 30
                          ? data.facebook?.substring(0, 30) + "..."
                          : data.facebook}
                      </td>
                      <td title={data.instagram}>
                        {data.instagram?.length > 30
                          ? data.instagram?.substring(0, 30) + "..."
                          : data.instagram}
                      </td>
                      <td title={data.whatsapp}>
                        {data.whatsapp?.length > 30
                          ? data.whatsapp?.substring(0, 30) + "..."
                          : data.whatsapp}
                      </td>{" "}
                      <td title={data.linkedIn}>
                        {data.linkedIn?.length > 30
                          ? data.linkedIn?.substring(0, 30) + "..."
                          : data.linkedIn}
                      </td>
                      <td title={data.twitter}>
                        {data.twitter?.length > 30
                          ? data.twitter?.substring(0, 30) + "..."
                          : data.twitter}
                      </td>
                      <td title={data.tiktok}>
                        {data.tiktok?.length > 30
                          ? data.tiktok?.substring(0, 30) + "..."
                          : data.tiktok}
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
          <AddNavigation
            openModal={openModal}
            handleModal={handleModal}
            getnavigation={getnavigation}
          />
        )}
        {editModal && (
          <EditNavigation
            openModal={editModal}
            handleModal={handleEditModal}
            navigation={navigation}
            setNavigation={setNavigation}
            getnavigation={getnavigation}
          />
        )}
      </Container>
    </>
  );
};

export default Navigation;
