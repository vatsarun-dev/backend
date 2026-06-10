import { useState, useEffect } from "react";
import List from "./component/List.jsx";
import axios from "axios";
const App = () => {
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
  });

  const [getAllData, setGetAllData] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    let res = await axios.post(
      "http://localhost:3000/api/list/create",
      formData,
    );
    console.log(res);
    setFormData({
      taskName: "",
      description: "",
    });
    getResponse();
  };

  const getResponse = async () => {
    let get = await axios.get("http://localhost:3000/api/list/");
    setGetAllData(get.data.list || []);
  };
  useEffect(() => {
    getResponse();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/list/delete/${id}`);
      setGetAllData((currentData) =>
        currentData.filter((item) => item._id !== id),
      );
      alert("Item deleted successfully");
    } catch (error) {
      console.log("error while deleting item", error);
      alert("Item could not be deleted");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(320px,440px)_1fr]">
          <form
            onSubmit={handleSubmit}
            className="h-fit rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-black/30"
          >
            <div className="mb-6">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Todo List
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Create a task with a name and description.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="taskName"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Task Name
                </label>
                <input
                  id="taskName"
                  name="taskName"
                  type="text"
                  value={formData.taskName}
                  onChange={handleChange}
                  placeholder="Enter task name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter task description"
                  rows="5"
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Submit
            </button>
          </form>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/20">
            <div className="mb-6 flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-cyan-300">
                  Dashboard
                </p>
                <h2 className="mt-1 text-3xl font-semibold text-white">
                  Added Tasks
                </h2>
              </div>
            </div>

            {getAllData.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/70 p-8 text-center">
                <h3 className="text-lg font-semibold text-slate-100">
                  No tasks added yet
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Tasks from your database will appear here after you create
                  them.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {getAllData.map((e, index) => {
                  return (
                    <List
                      key={e._id}
                      taskName={e.taskName}
                      description={e.description}
                      handleDelete={handleDelete}
                      id={e._id}
                    />
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default App;
