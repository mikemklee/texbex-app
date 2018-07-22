import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import numeral from "numeral";

const PriceField = ({
  name,
  placeholder,
  value,
  error,
  info,
  label,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="price__field">
      {label && <h6 className="price__field__label">{label}</h6>}
      <input
        autoComplete="off"
        type={type}
        className={classnames("price__field__input", {
          "price__field__input--invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <div className="price__field__preview">
        {numeral(value / 100).format("$0,0.00")}
      </div>
      {info && <div className="price__field__info">{info}</div>}
      {error && <div className="price__field__error">{error}</div>}
    </div>
  );
};

PriceField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.string
};

PriceField.defaultProps = {
  type: "text"
};

export default PriceField;
