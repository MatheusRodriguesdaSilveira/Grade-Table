import { Button } from "@/components/ui/button";
import { useCheckoutStore } from "@/stores/checkout";
import { Student } from "@/types/Students";
import { Dispatch, SetStateAction } from "react";
import { Steps } from "@/types/steps";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  setStep: Dispatch<SetStateAction<Steps>>;
  onAdd: (student: Student) => void;
};

export const StepFinish = ({ setStep, onAdd }: Props) => {
  const { name, informations } = useCheckoutStore((state) => state);

  // Calcula a nota final e determina se o aluno está ativo ou inativo
  const grade1 = parseFloat(informations.grade1);
  const grade2 = parseFloat(informations.grade2);
  const gradeFinal = ((grade1 + grade2) / 2).toFixed(1);
  const isActive = parseFloat(gradeFinal) >= 6; // Define o critério para ativo

  const newStudent: Student = {
    id: Math.random(), // Substitua por uma lógica de geração de ID adequada
    name,
    email: informations.email,
    avatar: informations.avatar || "",
    active: isActive, // Define se o aluno está ativo com base na nota final
    grade1,
    grade2,
    gradeFinal: parseFloat(gradeFinal), // Convertido para número
  };

  const handleFinish = () => {
    onAdd(newStudent);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
      <p className="text-lg">
        Your submission is complete. Here is a summary of your information:
      </p>
      <div className="bg-gray-900 p-4 rounded">
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {informations.email}
        </p>
        <p>
          <strong>Grade1:</strong> {informations.grade1}
        </p>
        <p>
          <strong>Grade2:</strong> {informations.grade2}
        </p>
        <p>
          <strong>Grade Final:</strong> {gradeFinal}
        </p>
        <p>
          <strong>Status:</strong> {isActive ? "Active" : "Inactive"}
        </p>
      </div>

      <div className="flex justify-between mt-4">
        <Button variant="link" onClick={() => setStep("informations")}>
          Return
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Add</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will save the data entered. Make sure you want
                additional.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleFinish}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
