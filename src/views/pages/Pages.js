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
import AddLayout1 from "./AddLayout1";
import AddLayout2 from "./AddLayout2";
import AddLayout3 from "./AddLayout3";
import EditPages from "./EditPages";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const Pages = ({ status }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const history = useHistory();
  const [data, setData] = useState({});

  const [pages, setPages] = useState({
    _id: "",
    name: "",
    path: "",
    layout: "",
  });
  let [page, setPage] = useState({
    name: "",
    path: "",
    layout: "",
    rel: "",
  });

  useEffect(() => {
    getPages();
  }, []);

  const getPages = async () => {
    const pages = await api("get", "/pages");
    setData(pages);
    console.log("====", pages);
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setPages({
        _id: item._id,
        name: item.name,
        path: item.path,
        layout: item.layout,
      });
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = () => {
    api("delete", "/pages").then(() => {
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
                    <th scope="col">Layout</th>
                    <th scope="col">Title</th>
                    <th scope="col">Path</th> <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data).length > 0 ? (
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm" title={data.layout}>
                              {data.layout?.length > 30
                                ? data.layout?.substring(0, 30) + "..."
                                : data.layout}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td title={data.name}>
                        {data.name?.length > 30
                          ? data.name?.substring(0, 30) + "..."
                          : data.name}
                      </td>
                      <td title={data.path}>
                        {data.path?.length > 30
                          ? data.path?.substring(0, 30) + "..."
                          : data.path}
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
          <AddPages
            openModal={openModal}
            handleModal={handleModal}
            getPages={getPages}
            setPages={setPage}
            pages={page}
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

        {/* Add Layouts */}
        {page.layout === "type1" && (
          <AddLayout1 openModal={openModal} handleModal={handleModal} />
        )}
        {page.layout === "type2" && <AddLayout2 />}
        {page.layout === "type3" && <AddLayout3 />}
        {/* {pages.layout === "type1" && } */}
      </Container>
    </>
  );
};

export default Pages;
