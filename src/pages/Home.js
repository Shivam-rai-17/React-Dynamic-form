import React, { useEffect, useState, useRef } from 'react';
import { getData } from '../api/data';
import DynamicForm from '../Components/DynamicForm';

const Home = () => {
  const [formFields, setFormFields] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const inputRefs = useRef([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getData();
      setFormFields(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = e.target.checked ? value : '';
    setFormValues({ ...formValues, [name]: updatedValue });
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
  const handleFileRemove = (fieldName) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: null,
    }));
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

  const setRef = (index, inputRef) => {
    inputRefs.current[index] = inputRef;
  };

  return (
    <div className="container">
      <h1>Dynamic Form</h1>
      <DynamicForm
        formFields={formFields}
        formValues={formValues}
        formErrors={formErrors}
        inputRefs={inputRefs}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
        handleFileRemove={handleFileRemove}
        setRef={setRef}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};

export default Home;
