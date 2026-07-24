import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { BadgeCheck, ImagePlus, Mail, Phone, Save, UserRound } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { FormField } from "../../components/ui/FormField";
import { PageHeader } from "../../components/ui/PageHeader";
import { studentService } from "../../services/studentService";
import { getApiError } from "../../services/apiClient";
import { useGsapReveal } from "../../hooks/useGsapReveal";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  fatherName: z.string().optional(),
  studentId: z.string().min(1, "Student ID is required"),
  email: z.string().email("Invalid email"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter an Indian mobile number"),
  course: z.string().min(1, "Course is required"),
  class: z.coerce.number().min(1, "Class is required"),
  image: z.any().refine((files) => files?.length === 1, "Student image is required"),
});

export function AddStudentPage() {
  const scope = useGsapReveal();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { class: 6 },
  });

  async function onSubmit(values) {
    setLoading(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "image") formData.append("image", value[0]);
      else if (value !== undefined && value !== "") formData.append(key, value);
    });
    formData.append("totalFees", "0");
    formData.append("paidFees", "0");

    try {
      const { data } = await studentService.register(formData);
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
    onChange: (event) => {
      const file = event.target.files?.[0];
      if (file) setPreview(URL.createObjectURL(file));
    },
  });

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  return (
    <main className="page" ref={scope}>
      <PageHeader
        eyebrow="Student Management"
        title="Register a student"
        subtitle="Capture the profile, contact, class, course, and photo details required by the existing student API."
        meta={<><span>ImageKit upload</span><span>Shared register</span></>}
      />
      <form className="student-form panel" onSubmit={handleSubmit(onSubmit)}>
        <label className="upload-zone">
          {preview ? <img src={preview} alt="Student preview" /> : <div className="upload-placeholder"><ImagePlus size={34} /><strong>Choose student photo</strong><small>Portrait images work best for profile cards and search results.</small></div>}
          <input type="file" accept="image/*" {...imageRegister} />
          {errors.image ? <small className="field-error">{errors.image.message}</small> : null}
        </label>
        <div className="form-grid">
          <FormField label="Student name" error={errors.name?.message}><div className="input-shell"><UserRound size={17} /><input {...register("name")} /></div></FormField>
          <FormField label="Father name" error={errors.fatherName?.message}><div className="input-shell"><UserRound size={17} /><input {...register("fatherName")} /></div></FormField>
          <FormField label="Student ID" error={errors.studentId?.message}><div className="input-shell"><BadgeCheck size={17} /><input {...register("studentId")} /></div></FormField>
          <FormField label="Email" error={errors.email?.message}><div className="input-shell"><Mail size={17} /><input type="email" {...register("email")} /></div></FormField>
          <FormField label="Mobile" error={errors.mobile?.message}><div className="input-shell"><Phone size={17} /><input {...register("mobile")} /></div></FormField>
          <FormField label="Course" error={errors.course?.message}><div className="input-shell"><BadgeCheck size={17} /><input {...register("course")} /></div></FormField>
          <FormField label="Class" error={errors.class?.message}>
            <div className="input-shell">
              <BadgeCheck size={17} />
              <select {...register("class")}>
                {[6, 7, 8, 9, 10, 11, 12].map((item) => <option key={item} value={item}>Class {item}</option>)}
              </select>
            </div>
          </FormField>
        </div>
        <div className="form-actions">
          <Button loading={loading} icon={Save} type="submit">Save student</Button>
        </div>
      </form>
    </main>
  );
}
