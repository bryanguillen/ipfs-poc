import { useState, useEffect } from 'react';
import { create } from 'ipfs-http-client';
import OrbitDb from 'orbit-db';
import './PersonForm.css';

function PersonForm() {
  const [familyDb, setFamilyDb] = useState(null);
  const [formValues, setFormValues] = useState({ name: '', age: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async function() {
      await initializeOrbitDb();
    })();
  }, []);

  useEffect(() => {
    (async function() {
      if (familyDb !== null) {
        await familyDb.load();
      }
    })();
  }, [familyDb]);

  /**
   * @description Function used to get the next id for post
   * @returns {Number}
   */
  async function getIdForPost() {
    const posts = await familyDb.get('');
    return posts[posts.length - 1]._id + 1;
  }

  /**
   * @description Function used to initialize the db
   * @returns {undefined}
   * @TODO Refactor ipfsClient so that only App.js declares the singleton instance
   */
  async function initializeOrbitDb() {
    const ipfsClient = create('http://localhost:5001');
    const orbitDb = await OrbitDb.createInstance(ipfsClient);
    setFamilyDb(await orbitDb.docstore('family', { accessController: { write: [orbitDb.identity.id] } }));
  }

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
  async function onSubmit(event) {
    try {
      event.preventDefault();
      setSubmitting(true);
      
      const { name, age } = formValues;
      const _id = await getIdForPost();
      
      await familyDb.put({ _id, name, age });

      setFormValues({ name: '', age: '' });
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }

  }

  return (
    <form className="person-form" onSubmit={familyDb ? onSubmit : undefined}>
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