import React, { useState } from 'react'

export default function App() {
  const data = [
    {id:110, listID:1, name:'Prudhvi'},
    {id:143, listID:2, name:'Raj'},
    {id:113, listID:3, name:'Nihan'},
    {id:234, listID:4, name:'Guna'},
    {id:116, listID:5, name:'Inthiyaz'},
    {id:117, listID:3, name:null},
    {id:115, listID:2, name:' '},
    {id:119, listID:3, name:'Praveen'},
    {id:140, listID:1, name:'Reddy'},
    {id:141, listID:3, name:'Naveen'},
    {id:152, listID:2, name:'Sathish'},
    {id:134, listID:4, name:null},
  ];
  const [id, setId] = useState(true);
  const [filterData, setFilterData] = useState(data);
  const [message, setMessage] = useState('Assending');
  const changeOrder = () => {
    if (message === 'Assending') {
      setMessage('Desending');
      setId(false)
    }else {
      setMessage('Assending');
      setId(true)
    }
  };
  function removeNull({name}) {
    return Boolean(name);
  }
  function sortByIdThenName(x,y) {
    const z = x.name - y.name;
    if (z===0) {
      return z;
    }
    if (id) {
      return x.name.localeCompare(y.name);
    }else {
      return y.name.localeCompare(x.name);
    }
  }
  const sorted = data.filter(removeNull).sort(sortByIdThenName);
  console.log(sorted);

  const filterBySearch = (e) => {
    const query = e.target.value;
    console.log('query',query);

    var updatedList = [...data];
    updatedList = updatedList.filter((item) => {
        console.log('item', item);
        if(item.id !== null) {
          return item.id.toString().indexOf(query.toString()) !== -1;
        }
    });
    setFilterData(updatedList);
  }
  return (
    <div>
        <h1>Filtering the Data</h1>
        <button onClick={()=> changeOrder()} >{message}</button>
        {
          sorted.map((item) => (
            <h3>{item.name}</h3>
          ))
        }
        <div className='search-header'>
          <div className='search-text'>Search:</div>
          <input id='search-box' onChange={(e)=>filterBySearch(e)} />
        </div>
        <div id='item-list'>
          <ol>
            {
              filterData.map((item,index) => (
                 <li key={index}>
                    {item.name} Id: {item.id}  listID: {item.listID}
                    
                 </li>
              ))
            }
          </ol>
        </div>
    </div>
  )
}
