import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { PageHeader } from "../../components/ui/PageHeader";

export function SearchStudentPage() {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [searched, setSearched] = useState(false);

  function handleSearch(event) {
    event.preventDefault();
    const rows = JSON.parse(sessionStorage.getItem("adhh.students.session") || "[]");
    setStudent(rows.find((row) => row.studentId === studentId.trim()) || null);
    setSearched(true);
  }

  return (
    <main className="page">
      <PageHeader eyebrow="Search Student" title="Find by student ID" subtitle="No backend search route exists yet, so this screen uses only records returned after successful registration in this session." />
      <form className="search-bar panel" onSubmit={handleSearch}>
        <input value={studentId} onChange={(event) => setStudentId(event.target.value)} placeholder="Enter Student ID" />
        <Button icon={Search} type="submit">Search</Button>
      </form>
      {student ? (
        <section className="student-profile panel">
          <img src={student.image} alt={student.name} />
          <div>
            <span className={`chip ${String(student.status).toLowerCase()}`}>{student.status}</span>
            <h2>{student.name}</h2>
            <p>{student.course} - Class {student.class}</p>
            <dl>
              <div><dt>Email</dt><dd>{student.email}</dd></div>
              <div><dt>Mobile</dt><dd>{student.mobile}</dd></div>
              <div><dt>Total Fees</dt><dd>Rs. {Number(student.totalFees || 0).toLocaleString("en-IN")}</dd></div>
              <div><dt>Pending Fees</dt><dd>Rs. {Number(student.pendingFees || 0).toLocaleString("en-IN")}</dd></div>
            </dl>
          </div>
        </section>
      ) : searched ? (
        <section className="panel"><EmptyState title="Student not found" message="A backend /api/student search route is needed for full-database search." /></section>
      ) : null}
    </main>
  );
}
