import { useMemo, useState } from "react";
import { GraduationCap, RefreshCw } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/PageHeader";
import { DataTable } from "../../components/ui/DataTable";
import { EmptyState } from "../../components/ui/EmptyState";
import { useStudents } from "../../hooks/useStudents";
import { useGsapReveal } from "../../hooks/useGsapReveal";

export function StudentsPage() {
  const scope = useGsapReveal();
  const { students, loading, error, refresh } = useStudents();
  const [activeClass, setActiveClass] = useState("All");
  const classes = useMemo(() => {
    const known = [6, 7, 8, 9, 10, 11, 12];
    const actual = students.map((student) => Number(student.class)).filter(Boolean);
    return ["All", ...Array.from(new Set([...known, ...actual])).sort((a, b) => a - b)];
  }, [students]);

  const rows = useMemo(
    () =>
      activeClass === "All"
        ? students
        : students.filter((student) => Number(student.class) === Number(activeClass)),
    [students, activeClass],
  );

  const columns = [
    { key: "studentId", label: "Student ID" },
    { key: "name", label: "Name" },
    { key: "course", label: "Course" },
    { key: "class", label: "Class" },
    { key: "status", label: "Status", render: (row) => <span className={`chip ${String(row.status).toLowerCase()}`}>{row.status}</span> },
  ];

  return (
    <main className="page" ref={scope}>
      <PageHeader
        eyebrow="Students"
        title="Student records"
        subtitle="Browse, filter, and sort the shared student register by class and status."
        meta={<><span>{students.length} total records</span><span>{classes.length - 1} class filters</span></>}
        action={<Button icon={RefreshCw} onClick={refresh} loading={loading}>Refresh</Button>}
      />
      <section className="class-tabs" aria-label="Class filter">
        {classes.map((item) => (
          <button
            className={String(activeClass) === String(item) ? "active" : ""}
            key={item}
            type="button"
            onClick={() => setActiveClass(item)}
          >
            {item === "All" ? "All classes" : `Class ${item}`}
          </button>
        ))}
      </section>
      {error ? (
        <section className="panel"><EmptyState icon={GraduationCap} title="Could not load students" message={error} /></section>
      ) : loading ? (
        <section className="table-shell skeleton-list" aria-label="Loading students"><i /><i /><i /><i /><i /></section>
      ) : (
        <DataTable columns={columns} rows={rows} searchKey="name" emptyTitle="No students in this class" emptyMessage="New registrations will appear here automatically after they are saved." />
      )}
    </main>
  );
}
