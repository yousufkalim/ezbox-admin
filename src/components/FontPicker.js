import { Col, FormGroup } from "reactstrap";
import ReactFontPicker from "font-picker-react";
import "assets/css/app.css";

function FontPicker({ data, setData, fieldName, width }) {
  return (
    <Col lg={width || "4"} style={{ margin: "auto" }}>
      <FormGroup>
        <label
          className="form-control-label"
          style={{ textTransform: "capitalize" }}
        >
          {fieldName.split("_")[0]} Font
        </label>
        <ReactFontPicker
          apiKey={process.env.REACT_APP_FONTS_API}
          activeFontFamily={data[fieldName] || "Urbanist"}
          onChange={(nextFont) => {
            setData((prev) => ({ ...prev, [fieldName]: nextFont.family }));
          }}
        />
      </FormGroup>
    </Col>
  );
}

export default FontPicker;
