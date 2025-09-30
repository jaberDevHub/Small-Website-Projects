import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/tests");
    const result = await response.json();
    setData(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newItem }),
    });
    setNewItem("");
    fetchData();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/tests/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const handleUpdate = async (id) => {
    const newName = prompt("Enter new name");
    if (newName) {
      await fetch(`http://localhost:5000/tests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });
      fetchData();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl mb-4">Test List</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new test"
          className="p-2 border rounded mr-2"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Add Item
        </button>
      </form>
      <ul>
        {data.map((item) => (
          <li key={item._id} className="flex justify-between items-center mb-2">
            <span>{item.name}</span>
            <div>
              <button
                onClick={() => handleUpdate(item._id)}
                className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
