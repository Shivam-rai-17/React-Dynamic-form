import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [formFields, setFormFields] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const inputRefs = useRef([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const data = await response.json();
      setFormFields(data);
    } catch (error) {
      console.error(error);
    }
  };

  const validateField = (fieldName, value) => {
    const field = formFields.find((field) => field.name === fieldName);
    const errorMsg = field.errorMsg || `Invalid input for ${field.label}`;
    if (field && field.displayType === 30 && field.isRequired && value.trim() === '') {
      return 'Field is required';
    }

    if (field && field.displayType === 30 && field.validationRegex && !new RegExp(field.validationRegex).test(value)) {
      return errorMsg;
    }

    return '';
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;
          setFormValues((prevValues) => ({
            ...prevValues,
            [name]: base64,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: '',
        }));
      }
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value || '',
      }));
    }
  };

  const handleFileRemove = (fieldName) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: null,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const updatedValue = checked ? value : '';
    setFormValues({ ...formValues, [name]: updatedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    formFields.forEach((field) => {
      const value = formValues[field.name] || '';

      if (field.isRequired) {
        const error = validateField(field.name, value);
        if (error) {
          errors[field.name] = error;
        }
      }
    });

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(formValues);
      alert('Your Form has been submitted');
    } else {
      console.log('Form contains errors. Please fix them.');
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentField = formFields[index];
      const { name, value } = e.target;

      if (currentField.isRequired && value.trim() === '') {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: 'Field isrequired',
        }));
      } else if (currentField.validationRegex && !new RegExp(currentField.validationRegex).test(value)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `Invalid input for ${currentField.label}`,
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));

        if (index < formFields.length - 1) {
          const nextFieldType = formFields[index + 1].displayType;
          const nextInputRef = inputRefs.current[index + 1];

          if (nextFieldType === 0 && nextInputRef) {
            const selectInput = nextInputRef.querySelector('select');
            if (selectInput) {
              selectInput.focus();
            }
          } else if (nextFieldType === 30 && nextInputRef) {
            const textInput = nextInputRef.querySelector('input[type="text"]');
            if (textInput) {
              textInput.focus();
            }
          } else if (nextFieldType === 40 && nextInputRef) {
            const checkboxInput = nextInputRef.querySelector('input[type="checkbox"]');
            if (checkboxInput) {
              checkboxInput.focus();
            }
          } else if (nextFieldType === 50 && nextInputRef) {
            const passwordInput = nextInputRef.querySelector('input[type="password"]');
            if (passwordInput) {
              passwordInput.focus();
            }
          }
        } else if (index === formFields.length - 1) {
          handleSubmit(e);
        }
      }
    }
  };

  const setRef = (index, inputRef) => {
    inputRefs.current[index] = inputRef;
  };

  return (
    <div className="container">
      <h1>Dynamic Form</h1>
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={field.name} ref={(inputRef) => setRef(index, inputRef)}>
            {field.displayType === 30 && (
              <div className="form-group mb-3">
                <label htmlFor={field.name}>
                  {field.label} {field.isRequired && <span className="asterisk">*</span>}
                </label>
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={formValues[field.name] || ''}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="form-control"
                />
                {formErrors[field.name] && <p className="error">{formErrors[field.name]}</p>}
              </div>
            )}
            {field.displayType === 50 && (
              <div className="form-group mb-3">
                <label htmlFor={field.name}>
                  {field.label} {field.isRequired && <span className="asterisk">*</span>}
                </label>
                <input
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={formValues[field.name] || ''}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="form-control"
                />
                {formErrors[field.name] && <p className="error">{formErrors[field.name]}</p>}
              </div>
            )}

            {field.displayType === 0 && (
              <div className="form-group mb-3">
                <label htmlFor={field.name}>
                  {field.label} {field.isRequired && <span className="asterisk">*</span>}
                </label>
                <select
                  name={field.name}
                  id={field.id}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="form-control"
                >
                 {field.pickListEntry.map((option) => (
                    <option value={option.name} key={option.key}>
                      {option.value}
                    </option>
                  ))}
                </select>
                {formErrors[field.name] && <p className="error">{formErrors[field.name]}</p>}
              </div>
            )}
            {field.displayType === 40 && (
              <div className="form-group mb-3">
                <label>
                  {field.label} {field.isRequired && <span className="asterisk">*</span>}
                </label>
                <div className="checkBoxHolder row">
                  {field.pickListEntry.map((option) => (
                    <div className="checkbox form-check col-12 mb-2" key={`${field.name}_${option.key}`}>
                      <div className="form-check">
                      <label className="form-check-label" htmlFor={`${field.name}_${option.key}`}>{option.value}</label>
                      <input
                        type="checkbox"
                        id={`${field.name}_${option.key}`}
                        name={field.name}
                        value={option.name}
                        className="form-check-input"
                        checked={formValues[field.name] === option.name}
                        onChange={handleCheckboxChange}
                      />
                      </div>
                    </div>
                  ))}
                </div>
                {formErrors[field.name] && <p className="error">{formErrors[field.name]}</p>}
              </div>
            )}
            {field.displayType === 60 && (
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
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default App;
