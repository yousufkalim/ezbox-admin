// reactstrap components
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "api";
import { Store } from "StoreContext";
import { Card, CardHeader, Table, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const ViewUser = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [user, setUser] = useState({});
  const { users } = Store();
  const { userId } = useParams();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await api("get", `/results/${userId}`);
    setUser(data?.user);
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    setUser(item || user);
    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = (id) => {
    api("delete", `/users/${id}`).then(() => {
      toast.success("User deleted successfully");
      getUsers();
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
                  <h3 className="mb-0">Result</h3>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Technology</th>
                    <th scope="col">Total Questions</th>
                    <th scope="col">Correct</th>
                    <th scope="col">Wrong</th>
                    <th scope="col">Percentage</th>
                    <th scope="col">Rank 0-10</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.result?.result_by_tech.map((tech) => {
                    return (
                      <tr key={tech.id}>
                        <th>{tech.technology}</th>
                        <td>{tech.total}</td>
                        <td>{tech.correct}</td>
                        <td>{tech.wrong}</td>
                        <td>{tech.percentage}</td>
                        <td>{tech.rank}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <th>Overall</th>
                    <td>{user?.result?.total}</td>
                    <td>{user?.result?.total_correct}</td>
                    <td>{user?.result?.total_wrong}</td>
                    <td>{user?.result?.overall_percentage}</td>
                    <td>{user?.result?.overall_rank}</td>
                  </tr>
                </tbody>
              </Table>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Technology</th>
                    <th scope="col">Question</th>
                    <th scope="col">Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.result?.questionnaire.map((data) => (
                    <tr
                      key={data.id}
                      style={{
                        backgroundColor: data.answer.correct
                          ? "rgba(46, 160, 67, 0.15)"
                          : "rgba(248, 81, 73, 0.15)",
                      }}
                    >
                      <th>{data.technology}</th>
                      <td title={data.question.question}>
                        {data.question.question.length > 60
                          ? data.question.question.substring(0, 60) + "..."
                          : data.question.question}
                      </td>
                      <td title={data.answer.answer}>
                        {data.answer.answer.length > 60
                          ? data.answer.answer.substring(0, 60) + "..."
                          : data.answer.answer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* ///////////     Pagination Disabled Temp     ///////////// */}

              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ViewUser;
