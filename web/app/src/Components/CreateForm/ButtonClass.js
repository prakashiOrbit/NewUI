import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ButtonClass = (props) => {
  const navigate = useNavigate();
  const { aev, formDetails } = props;
  let submitURL = formDetails.submitURL;
  if (aev === "edit" && formDetails.submitURL) {
    submitURL = formDetails.submitURLForEdit;
  }

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2, ml: 3 }}
      onClick={
        formDetails.redirect
          ? () => navigate(formDetails.redirect)
          : submitURL
          ? () => props.showData(submitURL, props.search ? true : false)
          : ""
      }
    >
      {aev !== "edit"
        ? formDetails.label
        : formDetails.submitURL
        ? "Save"
        : "Cancel"}
    </Button>
  );
};

export default ButtonClass;
