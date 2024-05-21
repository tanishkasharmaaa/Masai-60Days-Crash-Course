import { useRef } from 'react';

const DynamicFormFocus = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const focusLastName = () => {
    lastNameRef.current.focus();
  };

  return (
    <form>
      <div>
        <label>First Name</label>
        <input ref={firstNameRef} type="text" />
      </div>
      <div>
        <label>Last Name</label>
        <input ref={lastNameRef} type="text" />
      </div>
      <button type="button" onClick={focusLastName}>Focus Last Name</button>
    </form>
  );
};

export default DynamicFormFocus;
