import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpDown, Search } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { Button } from "./Button";

export function DataTable({
  columns,
  rows,
  searchKey = "name",
  emptyTitle = "No records yet",
  emptyMessage = "Records returned by the existing APIs will appear here.",
  pageSize = 8,
}) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(columns[0]?.key);
  const [direction, setDirection] = useState("asc");
  const [page, setPage] = useState(1);

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

  const pageCount = Math.max(1, Math.ceil(data.length / pageSize));
  const pageRows = data.slice((page - 1) * pageSize, page * pageSize);

  function toggleSort(key) {
    if (sortKey === key) setDirection((current) => (current === "asc" ? "desc" : "asc"));
    setSortKey(key);
    setPage(1);
  }

  return (
    <section className="table-shell" data-reveal>
      <div className="table-toolbar">
        <div className="table-search">
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search records"
          />
        </div>
        <span>{data.length} records</span>
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
            {pageRows.map((row) => (
              <tr key={row._id || row.studentId}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length ? (
        <div className="table-footer">
          <span>Page {page} of {pageCount}</span>
          <div>
            <Button variant="ghost" size="sm" icon={ArrowLeft} disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Prev</Button>
            <Button variant="ghost" size="sm" icon={ArrowRight} disabled={page === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>Next</Button>
          </div>
        </div>
      ) : null}
      {!data.length ? (
        <EmptyState title={emptyTitle} message={emptyMessage} />
      ) : null}
    </section>
  );
}
