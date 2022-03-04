import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
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
import LayoutForm1 from "./LayoutForm1";
import LayoutForm2 from "./LayoutForm2";
import LayoutForm3 from "./LayoutForm3";

const AddPages = ({
  openModal,
  handleModal,
  getPages,
  page,
  setPage,
  layout,
  setLayout,
}) => {
  let [step, setStep] = useState(0);

  const handleStepChange = () => {
    if (page.layout_type === "type1") {
      setStep(1);
    } else if (page.layout_type === "type2") {
      setStep(2);
    } else if (page.layout_type === "type3") {
      setStep(3);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = page;

    if (!(page.name && page.path)) {
      return toast.error("All fields are required");
    }

    if (step === 1) {
      if (!(layout.title && layout.text && layout.textbottom)) {
        return toast.error("All fields are required");
      }

      if (!(layout.leftImg && layout.rightImg && layout.centerImg)) {
        return toast.error("Wait before the image to upload");
      }

      formData = { ...formData, layout };
    } else if (step === 2) {
      if (!layout.text) {
        return toast.error("All fields are required");
      }

      if (!(layout.leftImg && layout.centerImg && layout.rightImg)) {
        return toast.error("Wait before the image to upload");
      }

      formData = { ...formData, layout };
    } else if (step === 3) {
      if (!(layout.text && layout.textbottom)) {
        return toast.error("All fields are required");
      }

      if (!layout.image) {
        return toast.error("Wait before the image to upload");
      }

      formData = { ...formData, layout };
    }

    api("put", `/pages/${formData._id}`, formData).then((res) => {
      toast.success("Page updated successfully");
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
        {step === 1 && <LayoutForm1 layout={layout} setLayout={setLayout} />}
        {step === 2 && <LayoutForm2 layout={layout} setLayout={setLayout} />}
        {step === 3 && <LayoutForm3 layout={layout} setLayout={setLayout} />}

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
