"use client";
import react,{ useState, useEffect } from "react";
import axios from "axios";

export default function Home() {


    const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/News/getNews');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    // Handle deletion logic here
    console.log('Deleting event with ID:', eventId);
  };

  const products = [
    {
      id: 1,
      name: "Product 1",
      category: "PC",
      brand: "Samsung",
      price: 300,
      stock: 10,
      totalSales: 100,
    },
    {
      id: 2,
      name: "Product 3",
      category: "Phone",
      brand: "Apple",
      price: 800,
      stock: 20,
      totalSales: 200,
    },
    {
      id: 3,
      name: "Product 4",
      category: "Phone",
      brand: "Apple",
      price: 500,
      stock: 50,
      totalSales: 120,
    },
    {
      id: 4,
      name: "Product 5",
      category: "Phone",
      brand: "Apple",
      price: 600,
      stock: 40,
      totalSales: 100,
    },
    // Add more products as needed
  ];

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortColumn) {
      if (sortOrder === "asc") {
        return a[sortColumn] < b[sortColumn] ? -1 : 1;
      } else {
        return a[sortColumn] > b[sortColumn] ? -1 : 1;
      }
    } else {
      return 0;
    }
  });

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortSvg = (column) =>
    sortColumn === column ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        {sortOrder === "asc" ? (
          <path d="M7 10l5 5 5-5z" />
        ) : (
          <path d="M7 14l5-5 5 5z" />
        )}

        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    ) : null;

  return (
    <>
    <div className="bg-white p-4 font-raleway">
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products Table</h2>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th onClick={() => handleSort("name")}>
              <div className="flex flex-row justify-center items-center">
                <p>Product</p>
                {sortSvg("name")}
              </div>
            </th>
            <th onClick={() => handleSort("category")}>
              <div className="flex flex-row justify-center items-center">
                <p>Category</p>
                {sortSvg("category")}
              </div>
            </th>
            <th onClick={() => handleSort("brand")}>
              <div className="flex flex-row justify-center items-center">
                <p>Brand</p>
                {sortSvg("brand")}
              </div>
            </th>
            <th onClick={() => handleSort("price")}>
              <div className="flex flex-row justify-center items-center">
                <p>Price</p>
                {sortSvg("price")}
              </div>
            </th>
            <th onClick={() => handleSort("stock")}>
              <div className="flex flex-row justify-center items-center">
                <p>Stock</p>
                {sortSvg("stock")}
              </div>
            </th>
            <th onClick={() => handleSort("totalSales")}>
              <div className="flex flex-row justify-center items-center">
                <p>Total Sale</p>
                {sortSvg("totalSales")}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id} className="border-b border-gray-200">
              <td className="px-4 py-3 text-gray-600 text-center">
                {product.name}
              </td>
              <td className="px-4 py-3 text-gray-600 text-center">
                {product.category}
              </td>
              <td className="px-4 py-3 text-gray-600 text-center">
                {product.brand}
              </td>
              <td className="px-4 py-3 text-gray-600 text-center">
                {product.price}
              </td>
              <td className="px-4 py-3 text-gray-600 text-center">
                {product.stock}
              </td>
              <td className="px-4 py-3 text-gray-600 text-center">
                {product.totalSales}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <main>
      <div className='home'>
        <div className='content'>
          <div className="mainContent">
            <div className='title'>
              <h2>Manage Newsletter and Offers</h2>
            </div>
            <div className='NewsContainer'>
              {events.map((event, index) => (
                <div
                  key={index}
                  className="max-w-xs rounded overflow-hidden shadow-lg mx-auto transition-transform transform hover:scale-105 mt-2"
                  style={{ maxWidth: '270px', height: "550px" }}
                >
                  <img
                    src={event.picLink}
                    className="card-img-top h-40 object-cover"
                    style={{ width: "270px" }}
                    alt={event.title}
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2" style={{ color: 'var(--pink)' }}>{event.title}</div>
                    <p className="text-gray-600 text-base" style={{ fontSize: "0.9rem" }}>{event.description}</p>
                    <p className="text-gray-700 text-base mt-2" style={{ fontSize: "0.9rem" }}>Date: {new Date(event.newsDate).toLocaleDateString()}</p>
                    <p className="text-gray-700 text-base mt-2" style={{ fontSize: "0.9rem" }}>Price: {event.price} DA</p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
