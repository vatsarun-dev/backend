import React from "react";

const List = ({ id, taskName, description, handleDelete }) => {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-950 p-5 shadow-lg shadow-black/20">
      <div className="mb-4 flex items-start justify-between gap-4">
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
          Active
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white">{taskName}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      <div className="flex justify-between py-2">
        <button className="p-2 bg-amber-300 rounded-xl ">update</button>
        <button
          onClick={() => handleDelete(id)}
          className="p-2 bg-amber-300 rounded-xl "
        >
          delete
        </button>
      </div>
    </article>
  );
};

export default List;
