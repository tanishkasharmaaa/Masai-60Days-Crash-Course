import  { useRef } from 'react';

const CustomFormSubmission = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;

    if (firstName.length < 3 || lastName.length < 3) {
      alert('Both first name and last name must be at least 3 characters long');
    } else {
      alert(`Submitted: ${firstName} ${lastName}`);
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input ref={firstNameRef} type="text" />
      </div>
      <div>
        <label>Last Name</label>
        <input ref={lastNameRef} type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomFormSubmission;
