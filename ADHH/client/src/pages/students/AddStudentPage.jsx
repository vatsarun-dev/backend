import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ImagePlus, Save } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { FormField } from "../../components/ui/FormField";
import { PageHeader } from "../../components/ui/PageHeader";
import { studentService } from "../../services/studentService";
import { getApiError } from "../../services/apiClient";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  fatherName: z.string().optional(),
  studentId: z.string().min(1, "Student ID is required"),
  email: z.string().email("Invalid email"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter an Indian mobile number"),
  course: z.string().min(1, "Course is required"),
  class: z.coerce.number().min(1, "Class is required"),
  totalFees: z.coerce.number().min(0, "Total fees is required"),
  paidFees: z.coerce.number().min(0).optional(),
  dueDate: z.string().optional(),
  image: z.any().refine((files) => files?.length === 1, "Student image is required"),
});

export function AddStudentPage() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { paidFees: 0 },
  });

  const totalFees = Number(watch("totalFees") || 0);
  const paidFees = Number(watch("paidFees") || 0);
  const progress = totalFees ? Math.min(100, Math.round((paidFees / totalFees) * 100)) : 0;

  function rememberStudent(student) {
    const key = "adhh.students.session";
    const existing = JSON.parse(sessionStorage.getItem(key) || "[]");
    sessionStorage.setItem(key, JSON.stringify([student, ...existing.filter((item) => item.studentId !== student.studentId)]));
  }

  async function onSubmit(values) {
    setLoading(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "image") formData.append("image", value[0]);
      else if (value !== undefined && value !== "") formData.append(key, value);
    });

    try {
      const { data } = await studentService.register(formData);
      rememberStudent(data.student);
      toast.success(data.message || "Student added");
      reset();
      setPreview("");
    } catch (error) {
      toast.error(getApiError(error));
    } finally {
      setLoading(false);
    }
  }

  const imageRegister = register("image", {
    onChange: (event) => setPreview(URL.createObjectURL(event.target.files[0])),
  });

  return (
    <main className="page">
      <PageHeader eyebrow="Student Management" title="Add student" subtitle="This form posts multipart data to /api/student/register and uses the backend ImageKit upload flow." />
      <form className="student-form panel" onSubmit={handleSubmit(onSubmit)}>
        <label className="upload-zone">
          {preview ? <img src={preview} alt="Student preview" /> : <ImagePlus size={34} />}
          <span>Drop or choose student photo</span>
          <input type="file" accept="image/*" {...imageRegister} />
          {errors.image ? <small className="field-error">{errors.image.message}</small> : null}
        </label>
        <div className="form-grid">
          <FormField label="Student name" error={errors.name?.message}><input {...register("name")} /></FormField>
          <FormField label="Father name" error={errors.fatherName?.message}><input {...register("fatherName")} /></FormField>
          <FormField label="Student ID" error={errors.studentId?.message}><input {...register("studentId")} /></FormField>
          <FormField label="Email" error={errors.email?.message}><input type="email" {...register("email")} /></FormField>
          <FormField label="Mobile" error={errors.mobile?.message}><input {...register("mobile")} /></FormField>
          <FormField label="Course" error={errors.course?.message}><input {...register("course")} /></FormField>
          <FormField label="Class" error={errors.class?.message}><input type="number" {...register("class")} /></FormField>
          <FormField label="Due date" error={errors.dueDate?.message}><input type="date" {...register("dueDate")} /></FormField>
          <FormField label="Total fees" error={errors.totalFees?.message}><input type="number" {...register("totalFees")} /></FormField>
          <FormField label="Paid fees" error={errors.paidFees?.message}><input type="number" {...register("paidFees")} /></FormField>
        </div>
        <div className="fee-preview">
          <span>Payment progress</span>
          <strong>{progress}%</strong>
          <div><i style={{ width: `${progress}%` }} /></div>
        </div>
        <Button loading={loading} icon={Save} type="submit">Save student</Button>
      </form>
    </main>
  );
}
