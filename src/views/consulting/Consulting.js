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
import AddConsulting from "./AddConsulting";
import EditConsulting from "./EditConsulting";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const Consulting = ({ status }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const history = useHistory();
  const [data, setData] = useState({});
  const [consulting, setConsulting] = useState({
    _id: "",
    text: "",
    image: "",
    textbottom: "",
    contactbutton: true,
  });

  useEffect(() => {
    getConsulting();
  }, []);

  const getConsulting = async () => {
    const data = await api("get", "/consulting");
    setData(data.consulting);
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setConsulting({
        _id: item._id,
        text: item.text,
        image: item.image,
        textbottom: item.textbottom,
        contactbutton: item.contactbutton,
      });
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = () => {
    api("delete", "/consulting").then(() => {
      toast.success("consulting deleted successfully");
      getConsulting();
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
                  <h3 className="mb-0">Consulting</h3>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add Consulting
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Text</th>
                    <th scope="col">Text Bottom</th>
                    <th scope="col">Contact Button</th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data).length > 0 ? (
                    <tr>
                      <td title={data.text}>
                        {data.text?.length > 30
                          ? data.text?.substring(0, 30) + "..."
                          : data.text}
                      </td>
                      <td title={data.textbottom}>
                        {data.textbottom?.length > 30
                          ? data.textbottom?.substring(0, 30) + "..."
                          : data.textbottom}
                      </td>

                      <td title={data.contactbutton}>
                        {" "}
                        {data.contactbutton ? "Enabled" : "Disabled"}
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
          <AddConsulting
            openModal={openModal}
            handleModal={handleModal}
            getConsulting={getConsulting}
          />
        )}
        {editModal && (
          <EditConsulting
            openModal={editModal}
            handleModal={handleEditModal}
            consulting={consulting}
            setConsulting={setConsulting}
            getConsulting={getConsulting}
          />
        )}
      </Container>
    </>
  );
};

export default Consulting;
