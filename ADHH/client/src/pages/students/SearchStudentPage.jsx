import React, { useEffect, useState } from "react";
import { ArrowRight, Loader2, Search, SlidersHorizontal } from "lucide-react";
import { EmptyState } from "../../components/ui/EmptyState";
import { PageHeader } from "../../components/ui/PageHeader";
import { studentService } from "../../services/studentService";
import { getApiError } from "../../services/apiClient";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useGsapReveal } from "../../hooks/useGsapReveal";

export function SearchStudentPage() {
  const scope = useGsapReveal();
  const [query, setQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debouncedQuery = useDebouncedValue(query, 350);

  useEffect(() => {
    let alive = true;
    async function searchStudents() {
      const value = debouncedQuery.trim();
      setError("");
      if (!value) {
        setStudents([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data } = await studentService.search(value);
        if (alive) setStudents(data.students || []);
      } catch (err) {
        if (alive) setError(getApiError(err));
      } finally {
        if (alive) setLoading(false);
      }
    }

    searchStudents();
    return () => {
      alive = false;
    };
  }, [debouncedQuery]);

  return (
    <main className="page" ref={scope}>
      <PageHeader
        eyebrow="Search student"
        title="Find a student"
        subtitle="Search by student ID, name, class, course, father name, or mobile number."
        meta={<><span>Live backend search</span><span>Debounced requests</span></>}
      />
      <div className="search-bar panel">
        <Search size={18} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, mobile, student ID, class, or course" />
        {loading ? <Loader2 className="spin" size={18} /> : <SlidersHorizontal size={18} />}
      </div>
      {!query.trim() ? (
        <section className="panel"><EmptyState title="Start typing to search" message="Results load from the shared backend student database." /></section>
      ) : error ? (
        <section className="panel"><EmptyState title="Search failed" message={error} /></section>
      ) : !loading && !students.length ? (
        <section className="panel"><EmptyState title="No result found" message="Try a different name, roll number, class, or student ID." /></section>
      ) : (
        <section className="search-results">
          {students.map((student) => (
            <article className="student-profile panel" key={student._id || student.studentId}>
              <div className="student-photo"><img src={student.image} alt={student.name} /></div>
              <div>
                <span className={`chip ${String(student.status).toLowerCase()}`}>{student.status}</span>
                <h2>{student.name}</h2>
                <p>{student.course} / Class {student.class}</p>
                <dl>
                  <div><dt>Student ID</dt><dd>{student.studentId}</dd></div>
                  <div><dt>Email</dt><dd>{student.email}</dd></div>
                  <div><dt>Mobile</dt><dd>{student.mobile}</dd></div>
                  <div><dt>Registered</dt><dd>{student.createdAt ? new Date(student.createdAt).toLocaleDateString("en-IN") : "Recently"}</dd></div>
                </dl>
              </div>
              <ArrowRight className="profile-arrow" size={18} />
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
