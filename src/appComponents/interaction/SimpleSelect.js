import React from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#1e1e1e" : "#1e1e1e",
    backgroundColor: state.isSelected ? "#d2d2d2" : "white",
    fontSize: "13px",
    zIndex: "1",
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
  placeholder: (provided) => ({
    ...provided,
    color: "#1e1e1e",
    fontWeight: "500",
    fontSize: "13px",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
  }),
};
class SimpleSelect extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        native
        styles={customStyles}
        className={"select"}
        value={this.props.selectedOption}
        onChange={this.props.handleChange}
        options={this.props.options}
        placeholder={this.props.placeholder}
        isSearchable={false}
      />
    );
  }
}

export default SimpleSelect;
