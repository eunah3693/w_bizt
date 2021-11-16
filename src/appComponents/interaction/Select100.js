import React from "react";
import Select from "react-select";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#1e1e1e" : "#1e1e1e",
    backgroundColor: state.isSelected ? "#d2d2d2" : "#fff",
    "&:hover": {
      backgroundColor: "#d2d2d2",
      cursor: "pointer",
    },
    fontSize: "15px",
    fontWeight: "500",
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: "0%",
    boxShadow: "0",
    border: "1px solid #d2d2d2",
    "&:hover": {
      borderColor: "1px solid #d2d2d2",
    },
    "& .css-1uccc91-singleValue": {
      fontSize: "15px",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#1e1e1e",
    fontWeight: "500",
    fontSize: "15px",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
  }),
};
const Select100 = ({ menuStyle, ...props }) => {
  return (
    <Select
      styles={{ ...customStyles, menu: menuStyle }}
      className={"select"}
      autoFocus={false}
      isSearchable={false}
      {...props}
    />
  );
};

export default Select100;
