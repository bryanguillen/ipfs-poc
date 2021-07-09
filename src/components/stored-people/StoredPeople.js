import { useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';
import OrbitDb from 'orbit-db';

import './StoredPeople.css';

function StoredPeople() {
  const [familyDb, setFamilyDb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState(null);  
  
  useEffect(() => {
    (async function() {
      await initializeOrbitDb();
    })();
  }, []);

  useEffect(() => {
    (async function() {
      if (familyDb !== null) {
        await familyDb.load();
        setPeople(await familyDb.get(''));
        setLoading(false);
      }
    })();
  }, [familyDb]);

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

  return (
    !loading && people ? 
      <div className="stored-people">
        {people.map(person => (
          <StoredPerson name={person.name} age={person.age} id={person._id}/>
        ))}
      </div> :
      <div>loading...</div>
  );
}

function StoredPerson({
  name,
  id,
  age
}) {
  return (
    <div className="stored-person">
      <div className="stored-person-id">{id}</div>
      <div className="stored-person-name">{name}</div>
      <div className="stored-person-age">{age}</div>
    </div>
  );
}

export default StoredPeople;