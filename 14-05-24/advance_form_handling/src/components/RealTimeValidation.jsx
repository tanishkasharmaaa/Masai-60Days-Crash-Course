import  { useRef, useState } from 'react';

const RealTimeValidationForm = () => {
  const [firstName, setFirstName] = useState('');
  const firstNameRef = useRef(null);
  const validationMessageRef = useRef(null);

  const validateInput = () => {
    if (firstName.length < 3) {
      validationMessageRef.current.textContent = 'First name must be at least 3 characters long';
    } else {
      validationMessageRef.current.textContent = '';
    }
  };

  const handleInputChange = (e) => {
    setFirstName(e.target.value);
    validateInput();
  };

  return (
    <form>
      <div>
        <label>First Name</label>
        <input 
          ref={firstNameRef} 
          type="text" 
          value={firstName} 
          onChange={handleInputChange} 
        />
      </div>
      <div ref={validationMessageRef} style={{ color: 'red' }}></div>
    </form>
  );
};

export default RealTimeValidationForm;
