import { DataTable } from "../../components/ui/DataTable";
import { PageHeader } from "../../components/ui/PageHeader";

export function StudentsPage() {
  const rows = JSON.parse(sessionStorage.getItem("adhh.students.session") || "[]");
  const columns = [
    { key: "studentId", label: "Student ID" },
    { key: "name", label: "Name" },
    { key: "course", label: "Course" },
    { key: "class", label: "Class" },
    { key: "status", label: "Status", render: (row) => <span className={`chip ${String(row.status).toLowerCase()}`}>{row.status}</span> },
    { key: "pendingFees", label: "Pending Fees", render: (row) => `Rs. ${Number(row.pendingFees || 0).toLocaleString("en-IN")}` },
  ];
  return (
    <main className="page">
      <PageHeader eyebrow="Students" title="Student records" subtitle="Current backend has registration only; saved responses from this browser session are shown here." />
      <DataTable columns={columns} rows={rows} searchKey="name" />
    </main>
  );
}
