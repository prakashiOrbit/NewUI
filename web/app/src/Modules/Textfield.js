import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
const CustomTextField = ({ label, value, defaultValue, onChange,disable,validate, ...rest }) => {
    const [fieldValue, setFieldValue] = useState(value);

  const handleFieldChange = (event) => {
    setFieldValue(event.target.value);
    onChange(event);
  };
  return (
    <TextField
      label={label}
      value={fieldValue}
      required ={validate ? true : false}
      fullWidth
      id={label}
      disabled={disable}
     // defaultValue={defaultValue}
      onChange={handleFieldChange}
      variant="outlined"
 
      {...rest}
    />
  );
};

export default CustomTextField;