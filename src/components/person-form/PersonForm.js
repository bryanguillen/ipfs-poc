import { useState } from 'react';
import './PersonForm.css';

function PersonForm() {
  const [formValues, setFormValues] = useState({ name: '', age: '' });
  const [submitting, setSubmitting] = useState(false);

  /**
   * @description on change handler for input fields
   * @param {Object} event
   * @returns {undefined}
   */
  function onChange(event) {
    const { name, value } = event.target;
    setFormValues(previousState => ({ ...previousState, [name]: value }));
  }

  /**
   * @description on submit handler for form
   * @param {Object} event
   * @returns {undefined}
   */
  function onSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 3000);
  }

  return (
    <form className="person-form" onSubmit={onSubmit}>
      <div className="person-form-row">
        <label htmlFor="name" className="person-form-label">Full Name</label>
        <input name="name" id="name" className="person-form-input" value={formValues.name} onChange={onChange}/>
      </div>
      <div className="person-form-row">
        <label htmlFor="age" className="person-form-label">Age</label>
        <input name="age" id="age" className="person-form-input" value={formValues.age} onChange={onChange}/>
      </div>
      <div className="person-form-row person-form-submit-button-container">
        <button className="person-form-submit-button button-primary" type="submit">{submitting ? 'Submitting...' : 'Submit'}</button>
      </div>
    </form>
  );
}

export default PersonForm;