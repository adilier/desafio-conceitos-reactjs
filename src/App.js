import React, {useEffect, useState} from "react";
import { FiTrash2, FiPlus } from 'react-icons/fi'

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    });
  },[]);

  async function handleAddRepository(e) {
    e.preventDefault();
    const res = await api.post('/repositories', {
      title: title,
      url: url,
      techs: techs
    });

    setTitle('')
    setUrl('')
    setTechs('')

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
      <form>
        <div>
          <label>
            Nome
          </label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Desafio React"
          />
        </div>
        <div>
          <label>
            Url
          </label>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://github.com/adilier/desafio-conceitos-reactjs"
          />
        </div>
        <div>
          <label>
            Técnologias
          </label>
          <input
            value={techs}
            onChange={e => setTechs(e.target.value)}
            placeholder="Node, React, Javascript"
          />
        </div>
        <div className="containerButton">
          <button className="buttonForm" onClick={handleAddRepository}>Adicionar <FiPlus className="buttonIcon"/></button>
        </div>
      </form>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id} className="listItem">
              <h2>{repository.title}</h2>
              <p className="techs">{repository.techs}</p>
              <a href={repository.url} className="url" target="_blank" rel="noopener noreferrer">Acessar repositório</a>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover <FiTrash2 className="buttonIcon"/>
              </button>
            </li>
          ))
        }
      </ul>
      
    </div>
  );
}

export default App;
