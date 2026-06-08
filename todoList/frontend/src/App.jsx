import { useState } from "react";
import axios from "axios";
const App = () => {
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
  });

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
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-xl items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-black/30"
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
      </div>
    </div>
  );
};

export default App;
