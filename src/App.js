import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/point/');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/point/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };


  const addItem = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/point/', {
        name: newItem,
        latitude: latitude,
        longitude: longitude
      });
      setData([...data, response.data]);
      setNewItem('');
      setLatitude('');
      setLongitude('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="latitude">Широта:</label>
        <input type="text" id="latitude" value={latitude} onChange={e => setLatitude(e.target.value)} />
      </div>

      <div>
        <label htmlFor="longitude">Долгота:</label>
        <input type="text" id="longitude" value={longitude} onChange={e => setLongitude(e.target.value)} />
      </div>

      <button onClick={addItem}>Добавить элемент</button>

      <button onClick={fetchData}>Загрузить данные</button>

      {data.length > 0 ? (
        <ul>
          {data.map(item => (
            <li key={item.id}>
              <p>ID: {item.id}</p>
              <p>Latitude: {item.latitude}</p>
              <p>Longitude: {item.longitude}</p>
              <button onClick={() => deleteItem(item.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет данных</p>
      )}
    </div>
 
  );
};

export default App;
