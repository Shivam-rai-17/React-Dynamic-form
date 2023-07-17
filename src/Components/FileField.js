import React from 'react';

const FileField = ({ field, formValues, formErrors, handleInputChange, handleFileRemove }) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={field.name}>
        {field.label} {field.isRequired && <span className="asterisk">*</span>}
      </label>
      <input
        type="file"
        id={field.id}
        name={field.name}
        accept={field.filesAccepted}
        onChange={handleInputChange}
        data-testid={`form-field-input-${field.name.toLowerCase()}`}
        className="form-control-file"
      />
      {formValues[field.name] && (
        <div className="fileInfo">
          <span className="fileName">{formValues[field.name].name}</span>
          <button
            type="button"
            className="removeButto btn btn-danger"
            onClick={() => handleFileRemove(field.name)}
          >
            Remove
          </button>
        </div>
      )}
      {formErrors[field.name] && <p className="error">{formErrors[field.name]}</p>}
    </div>
  );
};

export default FileField;
