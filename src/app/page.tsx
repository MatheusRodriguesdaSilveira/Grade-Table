"use client";

import { useState, useEffect } from "react";
import { students as initialStudents } from "@/data/students";
import { StudentsTable } from "../components/StudentTable/StudentsTable";
import { Student } from "@/types/Students";
import { AddNewStudent } from "../components/addNewStudent/NewStudent";
import { User } from "lucide-react";

const Page = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const saveStudentsToLocalStorage = (students: Student[]) => {
    localStorage.setItem("students", JSON.stringify(students));
  };

  const loadStudentsFromLocalStorage = (): Student[] => {
    const savedStudents = localStorage.getItem("students");
    if (savedStudents) {
      return JSON.parse(savedStudents);
    }
    return initialStudents;
  };

  useEffect(() => {
    setIsHydrated(true);
    const savedStudents = loadStudentsFromLocalStorage();
    setStudents(savedStudents);

    // Salvar initialStudents no localStorage caso esteja vazio
    if (!localStorage.getItem("students")) {
      saveStudentsToLocalStorage(initialStudents);
    }
  }, []);

  const handleRemoveStudent = (id: number) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    saveStudentsToLocalStorage(updatedStudents);
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
    saveStudentsToLocalStorage(updatedStudents);
  };

  const handleAddStudent = (newStudent: Student) => {
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    saveStudentsToLocalStorage(updatedStudents);
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
