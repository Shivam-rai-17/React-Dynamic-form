import React from 'react';

const CheckboxField = ({ field, formValues, handleCheckboxChange }) => {
  return (
    <div className="form-group mb-3">
      <label>
        {field.label} {field.isRequired && <span className="asterisk">*</span>}
      </label>
      <div className="row">
        {field.pickListEntry.map((option) => (
          <div className="col-12 col-md-6" key={`${field.name}_${option.key}`}>
            <div className="form-check">
              <input
                type="checkbox"
                id={`${field.name}_${option.key}`}
                name={field.name}
                value={option.name}
                className="form-check-input"
                checked={formValues[field.name] === option.name}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor={`${field.name}_${option.key}`}>
                {option.value}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxField;
