import { Col, FormGroup } from "reactstrap";
import ReactFontPicker from "font-picker-react";
import "assets/css/app.css";

function FontPicker({ data, setData, fieldName }) {
  return (
    <Col lg="4" style={{ margin: "auto" }}>
      <FormGroup>
        <label className="form-control-label">Font Family</label>
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
