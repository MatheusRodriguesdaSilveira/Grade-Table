"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { StepUser } from "@/components/addNewStudent/steps/step-user";
import { StepInformations } from "@/components/addNewStudent/steps/step-informations";
import { StepFinish } from "@/components/addNewStudent/steps/step-finish";
import { Steps } from "@/types/steps";
import { Student } from "@/types/Students";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (student: Student) => void; // Adiciona a função onAdd aqui
};

export const CheckoutDialog = ({ open, onOpenChange, onAdd }: Props) => {
  const [step, setStep] = useState<Steps>("user");

  let progressPct = 0;
  switch (step) {
    case "user":
      progressPct = 30;
      break;
    case "informations":
      progressPct = 70;
      break;
    case "finish":
      progressPct = 100;
      break;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === "user" && "Name"}
            {step === "informations" && "Personal Data"}
            {step === "finish" && "Finalize"}
          </DialogTitle>
        </DialogHeader>

        <Progress value={progressPct} />

        <div className="flex flex-col gap-3">
          {step === "user" && <StepUser setStep={setStep} onAdd={onAdd} />}
          {step === "informations" && (
            <StepInformations setStep={setStep} onAdd={onAdd} />
          )}
          {step === "finish" && <StepFinish setStep={setStep} onAdd={onAdd} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
