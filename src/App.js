import React, { useState, useEffect } from 'react';
import api from './services/Api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css'

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

/*
tres conceitos do react
componente - bloco isolado de html e css no qual não interfere no resto da aplicação
estado - informações mantidas pelo componente ( conceito de imutabilidade)
propiedade - informações que um componente PAI passa para um componente FILHO
*/
function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  },[]);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
