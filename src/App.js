import React from "react";

import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";
import api from './services/api'

function App() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    async function load(){
      const res = await api.get('/repositories')
      setRepos(res.data)
    }
    load()
  }, [])

  async function handleAddRepository() {
    // TODO
    try {
      const res = await api.post('/repositories', {
        url:"https://github.com/Rocketseat/umbriel",
        title: `Umbriel ${Date.now()}`,
        techs: ["Node", "Express", "TypeScript"]
      })
      setRepos([ ...repos, res.data])
    } catch (error) {
      console.log(error.response);
    }

  }

  async function handleRemoveRepository(id) {
    // TODO
    try {
      await api.delete(`/repositories/${id}`)
      const newRepos = repos.filter(repo => repo.id != id)
      setRepos(newRepos)
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
