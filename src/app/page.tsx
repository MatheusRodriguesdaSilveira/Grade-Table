"use client";

import { useState, useEffect } from "react";
import { students as initialStudents } from "@/data/students";
import { StudentsTable } from "../components/StudentTable/StudentsTable";
import { Student } from "@/types/Students";
import { AddNewStudent } from "../components/addNewStudent/NewStudent";
import { User } from "lucide-react";

const Page = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleRemoveStudent = (id: number) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  const handleEditStudent = (
    id: number,
    name: string,
    email: string,
    avatar: string
  ) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, name, email, avatar } : student
    );
    setStudents(updatedStudents);
  };

  const handleAddStudent = (newStudent: Student) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  if (!isHydrated) return null;

  return (
    <div className="mx-auto container">
      <h1 className="flex justify-center items-center text-4xl p-5 font-bold gap-2">
        Students List
        <User className="size-9 text-lime-500" />
      </h1>

      <AddNewStudent onAdd={handleAddStudent} />

      <StudentsTable
        students={students}
        onRemove={handleRemoveStudent}
        onEdit={handleEditStudent}
        onClose={() => {}}
      />
    </div>
  );
};

export default Page;
