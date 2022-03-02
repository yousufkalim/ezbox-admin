import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import { Select } from "antd";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
  Label,
  Media,
} from "reactstrap";
import PageForm from "./PageForm";
import AddLayout1 from "./AddLayout1";
import AddLayout2 from "./AddLayout2";
import AddLayout3 from "./AddLayout3";

const AddPages = ({ openModal, handleModal, getPages }) => {
  let [step, setStep] = useState(0);
  let [page, setPage] = useState({
    name: "",
    path: "",
    layout_type: "",
    rel: "",
  });
  let [layout, setLayout] = useState({});

  const handleStepChange = () => {
    if (page.layout_type === "type1") {
      setStep(1);
    } else if (page.layout_type === "type2") {
      setStep(2);
    } else if (page.layout_type === "type3") {
      setStep(3);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!(page.name && page.path)) {
      return toast.error("All fields are required");
    }

    if (step === 1) {
      if (
        !(
          layout.title &&
          layout.text &&
          layout.leftImg &&
          layout.rightImg &&
          layout.centerImg &&
          layout.textbottom
        )
      ) {
        return toast.error("All fields are required");
      } else {
        setPage(prev => ({ ...prev, layout }));
      }
    } else if (step === 2) {
      if (
        !(layout.leftImg && layout.centerImg && layout.rightImg && layout.text)
      ) {
        return toast.error("All fields are required");
      } else {
        setPage(prev => ({ ...prev, layout }));
      }
    } else if (step === 3) {
      if (!(layout.text && layout.image && layout.textbottom)) {
        return toast.error("All fields are required");
      } else {
        setPage(prev => ({ ...prev, layout }));
      }
    }

    api("post", "/pages", page).then(res => {
      toast.success("Page added successfully");
      getPages();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Add Page
        </ModalHeader>
        {step === 0 && <PageForm page={page} setPage={setPage} />}
        {step === 1 && <AddLayout1 layout={layout} setLayout={setLayout} />}
        {step === 2 && <AddLayout2 layout={layout} setLayout={setLayout} />}
        {step === 3 && <AddLayout3 layout={layout} setLayout={setLayout} />}

        <ModalFooter>
          {page.rel === "internal" && step === 0 ? (
            <Button color="primary" onClick={handleStepChange}>
              Next
            </Button>
          ) : (
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddPages;
