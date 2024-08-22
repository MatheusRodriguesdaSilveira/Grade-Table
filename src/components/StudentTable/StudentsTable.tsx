import { Settings2Icon, Trash2Icon } from "lucide-react";
import { Student } from "@/types/Students";
import { useState } from "react";

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
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [editedEmail, setEditedEmail] = useState<string>("");
  const [editedAvatar, setEditedAvatar] = useState<File | null>(null);

  const handleRemoveClick = (id: number) => {
    onRemove(id);
  };

  const handleEditClick = (student: Student) => {
    setEditingStudentId(student.id);
    setEditedName(student.name);
    setEditedEmail(student.email);
    setEditedAvatar(null);
  };

  const handleSaveClick = () => {
    if (editingStudentId !== null) {
      const avatarUrl = editedAvatar ? URL.createObjectURL(editedAvatar) : ""; // Cria uma URL para o arquivo
      onEdit(editingStudentId, editedName, editedEmail, avatarUrl);
      setEditingStudentId(null);
    }
  };

  const handleCancelClick = () => {
    setEditingStudentId(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEditedAvatar(e.target.files[0]);
    }
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
                  open={editingStudentId === item.id}
                  onOpenChange={(open) => {
                    if (!open) {
                      setEditingStudentId(null);
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
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          value={editedEmail}
                          onChange={(e) => setEditedEmail(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="avatar" className="text-right">
                          Icon
                        </Label>
                        <Input
                          id="avatar"
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
