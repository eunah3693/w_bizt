import React from "react";
import Select from "react-select";

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: 80,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontSize: "13px",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#1e1e1e" : "#1e1e1e",
    backgroundColor: state.isSelected ? "#d2d2d2" : "white",
    fontSize: "13px",
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: "0%",
    boxShadow: "0 ",
    border: "1px solid #fff",
    "&:hover": {
      border: "1px solid #fff",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    justifyContent: "flex-end",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#1e1e1e",
    fontWeight: "600",
    fontSize: "13px",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
  }),
};

export default function SelectMini(props) {
  return (
    <Select native styles={customStyles} isSearchable={false} {...props} />
  );
}
