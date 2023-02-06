
import React, { useEffect, useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  

  
  useEffect(()=> {
      fetch('http://localhost:3001/pets')
      .then(resp => resp.json())
      .then(data => setPets(data))

  }, [])


  function onChangeType() {
    let typeSet = document.getElementById('type')
    return setFilters({
      type: typeSet.value
    })

  }
  
  function onFindPetsClick () {
    let x = filters.type

    if (x === 'all') {
      fetch('http://localhost:3001/pets')
      .then(resp => resp.json())
      .then(data => setPets(data))

    }

    if (x === 'cat') {
      fetch('http://localhost:3001/pets?type=cat')
      .then(resp => resp.json())
      .then(data => setPets(data))
      
    }

    if(x === 'dog') {
      fetch('http://localhost:3001/pets?type=dog')
      .then(resp => resp.json())
      .then(data => setPets(data))
      
    }

    if(x === 'micropig') {
      fetch('http://localhost:3001/pets?type=micropig')
      .then(resp => resp.json())
      .then(data => setPets(data))
      
  } 
  }

  function onAdoptPet(id) {
    const newPets = pets.map(pet => {
      
      if (pet.id === id) {
        pet.isAdopted = 'true'
        return pet
        
      }
    return pet
    })
    setPets(newPets)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
