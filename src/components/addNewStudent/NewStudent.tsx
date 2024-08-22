import { PlusCircle } from "lucide-react";
import { CheckoutDialog } from "@/components/addNewStudent/dialog";
import { useState } from "react";
import { Student } from "@/types/Students";

type AddNewStudentProps = {
  onAdd: (newStudent: Student) => void;
};

export const AddNewStudent = ({ onAdd }: AddNewStudentProps) => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Função para adicionar um aluno, que será chamada pelo CheckoutDialog
  const handleAddStudent = (student: Student) => {
    onAdd(student);
    setCheckoutOpen(false); // Fecha o modal após adicionar o estudante
  };

  return (
    <>
      <div className="flex mb-5 items-center">
        <p className="text-white text-xl font-extrabold flex px-2 gap-2">
          Add Profile
        </p>

        <button onClick={() => setCheckoutOpen(true)}>
          <PlusCircle className="text-lime-500" />
        </button>
      </div>

      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        onAdd={handleAddStudent}
      />
    </>
  );
};
