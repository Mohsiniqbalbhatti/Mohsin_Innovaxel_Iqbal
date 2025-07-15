import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const formFor = {
    shorten: {
      label: "Enter URL to shorten",
      placeholder: "https://example.com/some/long/path",
      endpoint: "/shorten",
      method: "post",
    },
    update: {
      label: "Enter new URL to update previous",
      placeholder: "https://example.com/update/long/path",
      endpoint: "/shorten",
      method: "put",
    },
    retrive: {
      label: "Enter short code to retrieve URL",
      placeholder: "e.g. abc123",
      endpoint: "/shorten",
      method: "get",
    },
    delete: {
      label: "Enter short code to delete URL",
      placeholder: "e.g. abc123",
      endpoint: "/shorten",
      method: "delete",
    },
    stats: {
      label: "Enter short code to get stats",
      placeholder: "e.g. abc123",
      endpoint: "/shorten/stats",
      method: "get",
    },
  };

  const [selected, setSelected] = useState("shorten");
  const [response, setResponse] = useState(null);
  const [formData, setFormData] = useState({ longUrl: "", shortCode: "" });
  const [load, setLoad] = useState(false);

  // send request to backend
  const sendRequest = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const { method, endpoint } = formFor[selected];
      if (method === "get" || method === "delete") {
        // For retrive, delete, stats
        let url = `${import.meta.env.VITE_Backend_URL}${endpoint}/${formData.shortCode}`;
        const res = await axios({ method, url });
        if (res.data) {
          setResponse(res.data);
        } else if (method === "delete" && res.status === 204) {
          setResponse({ message: "Deleted successfully" });
        }
      } else if (selected === "shorten") {
        // For shorten: use longUrl for Post request
        let url = `${import.meta.env.VITE_Backend_URL}${endpoint}`;
        const data = {
          url: formData.longUrl,
        };
        const res = await axios({ method, url, data });
        if (res.data) {
          console.log(res.data);
          setResponse(res.data);
        }
      } else if (selected === "update") {
        // For update: use both longUrl and shortCode
        let url = `${import.meta.env.VITE_Backend_URL}${endpoint}/${formData.shortCode}`;
        const data = {
          url: formData.longUrl,
        };
        const res = await axios({ method, url, data });
        if (res.data) {
          console.log(res.data);
          setResponse(res.data);
        }
      }
    } catch (error) {
      console.log("Error", error);
      setResponse({ error: error?.response?.data?.message || "Something Went Wrong" });
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    if (selected === "shorten") {
      setFormData({ longUrl: "", shortCode: "" });
    } else if (selected === "update") {
      setFormData({ longUrl: "", shortCode: "" });
    } else {
      setFormData({ longUrl: "", shortCode: "" });
    }
    setResponse(null);
    setLoad(false);
  }, [selected]);

  return (
    <div className="flex-col justify-center align-center">
      <h1 className="text-center mt-20 text-4xl font-semibold">URL SHORTNER</h1>
      <div className="box border-1 border-red-500 min-h-[300px] max-w-[572px] mx-auto">
        <div className="">
          <button
            className={`px-4 py-3  cursor-pointer border-1 ${
              selected == "shorten"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500 border-red-500"
            }`}
            onClick={() => setSelected("shorten")}
          >
            Shortend URL
          </button>
          <button
            className={`px-4 py-3  cursor-pointer border-1 ${
              selected == "update"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500 border-red-500"
            }`}
            onClick={() => setSelected("update")}
          >
            Update URL
          </button>
          <button
            className={`px-4 py-3  cursor-pointer border-1 ${
              selected == "retrive"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500 border-red-500"
            }`}
            onClick={() => setSelected("retrive")}
          >
            Retrive URL
          </button>
          <button
            className={`px-4 py-3  cursor-pointer border-1 ${
              selected == "delete"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500 border-red-500"
            }`}
            onClick={() => setSelected("delete")}
          >
            Delete URL
          </button>
          <button
            className={`px-4 py-3  cursor-pointer border-1 ${
              selected == "stats"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500 border-red-500"
            }`}
            onClick={() => setSelected("stats")}
          >
            Get Stats
          </button>
        </div>
        <form className="flex flex-col">
          <label className="m-3 mb-0">{formFor[selected].label}</label>
          {/* Show input fields based on selected tab */}
          {selected === "shorten" && (
            <input
              type="text"
              placeholder={formFor[selected].placeholder}
              className="p-2  bg-gray-200 rounded m-3 mt-0"
              value={formData.longUrl}
              onChange={(e) =>
                setFormData({ ...formData, longUrl: e.target.value })
              }
            />
          )}
          {selected === "update" && (
            <>
              <input
                type="text"
                placeholder="Enter new long URL"
                className="p-2  bg-gray-200 rounded m-3 mt-0"
                value={formData.longUrl}
                onChange={(e) =>
                  setFormData({ ...formData, longUrl: e.target.value })
                }
              />
          <label className="m-3 mb-0">Enter Short Code</label>
              <input
                type="text"
                placeholder="e.g abc123"
                className="p-2  bg-gray-200 rounded m-3 mt-0"
                value={formData.shortCode}
                onChange={(e) =>
                  setFormData({ ...formData, shortCode: e.target.value })
                }
              />
            </>
          )}
          {["retrive", "delete", "stats"].includes(selected) && (
            <input
              type="text"
              placeholder={formFor[selected].placeholder}
              className="p-2  bg-gray-200 rounded m-3 mt-0"
              value={formData.shortCode}
              onChange={(e) =>
                setFormData({ ...formData, shortCode: e.target.value })
              }
            />
          )}
          <button
            type="submit"
            className="px-4 py-3 text-white ms-auto me-3 bg-red-500 rounded-2xl w-[150px]"
            onClick={(e) => sendRequest(e)}
          >
            Submit
          </button>
        </form>
        {load && (
          <div className="flex justify-center my-4">
            <div className="loader border-4 border-t-4 border-red-500 border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
          </div>
        )}
        <pre className="p-3 bg-gray-100 rounded max-w-[560px] overflow-x-scroll my-2 ">
          {response ? JSON.stringify(response, null, 1) : "No data yet"}
        </pre>
      </div>
    </div>
  );
}
export default App;
