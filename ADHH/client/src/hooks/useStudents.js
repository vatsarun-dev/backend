import { useCallback, useEffect, useState } from "react";
import { studentService } from "../services/studentService";
import { getApiError } from "../services/apiClient";

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await studentService.list();
      setStudents(data.students || []);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  return { students, loading, error, refresh: loadStudents };
}
