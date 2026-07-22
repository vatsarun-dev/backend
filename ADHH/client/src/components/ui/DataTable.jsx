import { useMemo, useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { EmptyState } from "./EmptyState";

export function DataTable({ columns, rows, searchKey = "name" }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(columns[0]?.key);
  const [direction, setDirection] = useState("asc");

  const data = useMemo(() => {
    const filtered = rows.filter((row) =>
      String(row?.[searchKey] || "").toLowerCase().includes(query.toLowerCase()),
    );
    return filtered.sort((a, b) => {
      const av = String(a?.[sortKey] || "");
      const bv = String(b?.[sortKey] || "");
      return direction === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [rows, query, searchKey, sortKey, direction]);

  function toggleSort(key) {
    if (sortKey === key) setDirection((current) => (current === "asc" ? "desc" : "asc"));
    setSortKey(key);
  }

  return (
    <section className="table-shell" data-reveal>
      <div className="table-toolbar">
        <Search size={17} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search records" />
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>
                  <button type="button" onClick={() => toggleSort(column.key)}>
                    {column.label}
                    <ArrowUpDown size={14} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row._id || row.studentId}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!data.length ? (
        <EmptyState title="No backend records yet" message="Records returned by the existing APIs will appear here." />
      ) : null}
    </section>
  );
}
