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
import AddPages from "./AddPages";
import EditPages from "./EditPages";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const Pages = ({ status }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const history = useHistory();
  const [data, setData] = useState([]);

  const [pages, setPages] = useState([]);

  useEffect(() => {
    getPages();
  }, []);

  const getPages = async () => {
    const pages = await api("get", "/pages");
    setData(pages.data);
  };

  const handleModal = () => {
    setOpenModal(open => !open);
    return openModal;
  };

  const handleEditModal = item => {
    if (item) {
      setPages({
        _id: item._id,
        name: item.name,
        path: item.path,
        layout: item.layout,
      });
    }

    setEditModal(open => !open);
    return openModal;
  };

  const handleDelete = id => {
    api("delete", `/pages/${id}`).then(() => {
      toast.success("pages deleted successfully");
      getPages();
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
                  <h3 className="mb-0">Pages</h3>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add Page
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Layout</th>
                    <th scope="col">Type</th>
                    <th scope="col">Path</th> <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map(item => {
                      return (
                        <tr>
                          <td title={item.name}>
                            {item.name?.length > 30
                              ? item.name?.substring(0, 30) + "..."
                              : item.name}
                          </td>

                          <td title={item.layout_type}>
                            {item.layout_type?.length > 30
                              ? item.layout_type?.substring(0, 30) + "..."
                              : item.layout_type}
                          </td>

                          <td title={item.rel}>
                            {item.rel?.length > 30
                              ? item.rel?.substring(0, 30) + "..."
                              : item.rel}
                          </td>

                          <td title={item.path}>
                            {item.path?.length > 30
                              ? item.path?.substring(0, 30) + "..."
                              : item.path}
                          </td>

                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={e => e.preventDefault()}
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
          <AddPages
            openModal={openModal}
            handleModal={handleModal}
            getPages={getPages}
          />
        )}
        {editModal && (
          <EditPages
            openModal={editModal}
            handleModal={handleEditModal}
            pages={pages}
            setPages={setPages}
            getPages={getPages}
          />
        )}
      </Container>
    </>
  );
};

export default Pages;
