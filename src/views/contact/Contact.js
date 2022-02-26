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
import AddContact from "./AddContact";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const Contact = ({ status }) => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  let [contact, setContact] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    getContact();
  }, []);

  const getContact = async () => {
    const data = await api("get", "/contact");
    setData(data.messages);
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleDelete = (id) => {
    api("delete", `/contact/${id}`).then(() => {
      toast.success("Contact deleted successfully");
      getContact();
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
                  <h3 className="mb-0">Contacts</h3>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Message</th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data?.map((item) => {
                      return (
                        <tr>
                          <td title={item.name}>
                            {item.name?.length > 30
                              ? item.name?.substring(0, 30) + "..."
                              : item.name}
                          </td>

                          <td title={item.number}>
                            {item.number?.length > 30
                              ? item.number?.substring(0, 30) + "..."
                              : item.number}
                          </td>
                          <td title={item.email}>
                            {item.email?.length > 30
                              ? item.email?.substring(0, 30) + "..."
                              : item.email}
                          </td>

                          <td title={item.message}>
                            {item.message?.length > 30
                              ? item.message?.substring(0, 30) + "..."
                              : item.message}
                          </td>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-dark"
                                role="button"
                                size="sm"
                                color=""
                                onClick={() => handleDelete(item._id)}
                              >
                                <i className="fas fa-trash text-red" />
                              </DropdownToggle>
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
          <AddContact
            openModal={openModal}
            handleModal={handleModal}
            getContact={getContact}
          />
        )}
      </Container>
    </>
  );
};

export default Contact;
