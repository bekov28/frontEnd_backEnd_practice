import { useEffect, useState } from "react";
import axios from "axios";
import { baseAPI } from "./utils/api-constants";
import { toast } from "react-toastify";

function App() {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const getAllTodo = async (search) => {
    try {
      const { data } = await axios.get(baseAPI + "/todo/get-all", {
        params: { search },
      });

      if (data.success) {
        setTodo(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(baseAPI + "/todo/add", { title, desc });

    if (data.success) {
      toast.success("Successfully added!");
      getAllTodo();
      setDesc("");
      setTitle("");
    }
  };
  const handleChangeInput = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }
    if (e.target.name === "desc") {
      setDesc(e.target.value);
    }
  };

  useEffect(() => {
    getAllTodo("");
  }, []);

  return (
    <div>
      <div>
        <h1>Add</h1>
        {/* Old version */}
        {/* <form action={baseAPI + "/todo/add"} method="post">
          <input type="text" name="title" placeholder="title" />
          <input type="text" name="desc" placeholder="desc" />
          <input type="submit" />
        </form> */}
        <form onSubmit={addTodo}>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChangeInput}
            placeholder="title"
          />
          <input
            type="text"
            name="desc"
            value={desc}
            onChange={handleChangeInput}
            placeholder="desc"
          />
          <input type="submit" />
        </form>
      </div>
      <h1>Get Data</h1>
      <div>
        <input
          type="text"
          onChange={(e) => {
            getAllTodo(e.target.value);
          }}
        />
        <button>Search</button>
      </div>
      {todo.map((item) => (
        <div key={item._id}>
          <h2>{item.title}</h2>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
