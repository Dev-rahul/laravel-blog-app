// App.js
import React, { useState, useEffect } from 'react';
import ThreadList from './threadList';
import axios from 'lib/axios';
const AllThreads = () => {
  const [threads, setThreads] = useState([]);


  useEffect(() => {
    axios.get('/api/blog')
    .then(function (response) {
      // handle success
      console.log(response);
      setThreads(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Forum Threads</h1>
      <ThreadList threads={threads} />
    </div>
  );
};

export default AllThreads;
