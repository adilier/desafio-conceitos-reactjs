import React, {useEffect, useState} from "react";
import { FiTrash2, FiPlus } from 'react-icons/fi'

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    });
  },[]);

  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      title: "Back-end com node",
      url: "https://github.com/adilier/desafio-conceitos-node",
      techs: ["Node", "Express", "TypeScript"]
    });

    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const addRepositories = repositories.filter(
      repository => repository.id !== id
    )

    setRepositories(addRepositories);
  }

  return (
    <div className="container container-custom">
        <ul data-testid="repository-list">
          {
            repositories.map(repository => (
              <li key={repository.id} className="listItem">
                <h2>{repository.title}</h2>
                <p className="techs">{repository.techs.join(', ')}</p>
                <a href={repository.url} className="url" target="_blank" rel="noopener noreferrer">Acessar repositório</a>
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover <FiTrash2 className="buttonIcon"/>
                </button>
              </li>
            ))
          }
        </ul>
      <button onClick={handleAddRepository}>Adicionar <FiPlus className="buttonIcon"/></button>
    </div>
  );
}

export default App;
