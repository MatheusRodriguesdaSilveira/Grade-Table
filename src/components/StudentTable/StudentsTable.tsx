import { Settings2Icon, Trash2Icon } from "lucide-react";
import { Student } from "@/types/Students";
import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  students: Student[];
  onRemove: (id: number) => void;
  onClose: () => void;
  onEdit: (id: number, name: string, email: string, avatar: string) => void;
};

export const StudentsTable = ({
  students,
  onRemove,
  onClose,
  onEdit,
}: Props) => {
  const [editedStudent, setEditedStudent] = useState<Student | null>(null);
  const [editedAvatarFile, setEditedAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    const storedStudent = localStorage.getItem("editedStudent");
    if (storedStudent) {
      setEditedStudent(JSON.parse(storedStudent));
    }
  }, []);

  const handleRemoveClick = (id: number) => {
    onRemove(id);
  };

  useEffect(() => {
    // Verifica se há algum estudante em edição e limpa se encontrado
    const storedStudent = localStorage.getItem("editedStudent");
    if (storedStudent) {
      localStorage.removeItem("editedStudent");
    }
  }, []);

  const handleSaveClick = () => {
    if (editedStudent) {
      const avatarUrl = editedAvatarFile
        ? URL.createObjectURL(editedAvatarFile)
        : editedStudent.avatar;

      const reader = new FileReader();
      if (editedAvatarFile) {
        reader.onloadend = () => {
          const base64data = reader.result as string;

          const updatedStudent = { ...editedStudent, avatar: base64data };

          // Salvar no localStorage
          localStorage.setItem("editedStudent", JSON.stringify(updatedStudent));

          onEdit(
            updatedStudent.id,
            updatedStudent.name,
            updatedStudent.email,
            base64data
          );

          // Limpa o localStorage após salvar as mudanças
          localStorage.removeItem("editedStudent");

          setEditedStudent(null);
        };
        reader.readAsDataURL(editedAvatarFile);
      } else {
        const updatedStudent = { ...editedStudent, avatar: avatarUrl };

        // Salvar no localStorage
        localStorage.setItem("editedStudent", JSON.stringify(updatedStudent));

        onEdit(
          updatedStudent.id,
          updatedStudent.name,
          updatedStudent.email,
          avatarUrl
        );

        // Limpa o localStorage após salvar as mudanças
        localStorage.removeItem("editedStudent");

        setEditedStudent(null);
      }
    }
  };

  const handleEditClick = (student: Student) => {
    setEditedStudent({ ...student });
    setEditedAvatarFile(null); // Resetando o arquivo de avatar quando abrir o editor
    localStorage.setItem("editedStudent", JSON.stringify({ ...student }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditedAvatarFile(file);
    }
  };

  const handleCancelClick = () => {
    setEditedStudent(null);
  };

  return (
    <div className="flex justify-center items-center">
      <table className="w-full rounded-lg overflow-hidden border border-gray-600">
        <thead>
          <tr className="text-left border-b border-gray-600 bg-gray-800">
            <th className="p-3">Name</th>
            <th className="p-3">Status</th>
            <th className="p-3">Grade 1</th>
            <th className="p-3">Grade 2</th>
            <th className="p-3">Final Grade</th>
            <th className="p-3">Remove</th>
          </tr>
        </thead>

        <tbody>
          {students.map((item) => (
            <tr
              key={item.id}
              className="text-gray-800 bg-gray-500 border-b border-gray-600"
            >
              <td className="flex p-3 items-center">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 hover:scale-125 duration-300 rounded-full mr-3"
                />
                <div className="m-2">
                  <div className="font-extrabold">{item.name}</div>

                  <div className="flex gap-3">
                    {item.email}
                    <button onClick={() => handleEditClick(item)}>
                      <Settings2Icon className="size-6 text-slate-900 hover:scale-110 duration-300" />
                    </button>
                  </div>
                </div>
              </td>

              <td>
                {item.active ? (
                  <div className="cursor-pointer bg-lime-300 hover:bg-lime-700 duration-500 inline-block rounded-lg p-2 text-center text-zinc-800 font-semibold w-[100px]">
                    Active
                  </div>
                ) : (
                  <div className="cursor-pointer bg-red-600/80 hover:bg-red-900 duration-500 inline-block rounded-lg p-2 text-center text-neutral-950 font-semibold w-[100px]">
                    Inactive
                  </div>
                )}
              </td>

              <td className="text-zinc-800 items-center p-7 font-semibold">
                {item.grade1}
              </td>
              <td className="text-zinc-800 items-center p-7 font-semibold">
                {item.grade2}
              </td>

              <td className="text-black items-center px-10 font-bold">
                {item.active
                  ? (item.grade1 + item.grade2) / 2 >= 6
                    ? ((item.grade1 + item.grade2) / 2).toFixed(1)
                    : "--"
                  : "--"}
              </td>

              <td className="flex space-x-2">
                <Dialog
                  open={editedStudent?.id === item.id}
                  onOpenChange={(open) => {
                    if (!open) {
                      setEditedStudent(null);
                    }
                  }}
                >
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={editedStudent?.name || ""}
                          onChange={(e) =>
                            setEditedStudent((prev) =>
                              prev ? { ...prev, name: e.target.value } : null
                            )
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          value={editedStudent?.email || ""}
                          onChange={(e) =>
                            setEditedStudent((prev) =>
                              prev ? { ...prev, email: e.target.value } : null
                            )
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Icon" className="text-right">
                          Icon
                        </Label>
                        <Input
                          id="file_input"
                          type="file"
                          onChange={handleFileChange}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="ghost" onClick={handleCancelClick}>
                        Cancel
                      </Button>
                      <Button type="submit" onClick={handleSaveClick}>
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="text-black/70 items-center p-7 font-semibold">
                  <button onClick={() => handleRemoveClick(item.id)}>
                    <Trash2Icon className="size-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
