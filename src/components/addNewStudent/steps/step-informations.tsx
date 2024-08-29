import { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCheckoutStore } from "@/stores/checkout";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Student } from "@/types/Students";
import { Steps } from "@/types/steps";

const formSchema = z.object({
  email: z.string().min(2, "Fill in your information"),
  grade1: z
    .string()
    .min(1, "Please enter a valid number")
    .max(10)
    .regex(/^\d+$/, "Please enter a valid number"),
  grade2: z
    .string()
    .min(1)
    .max(10)
    .regex(/^\d+$/, "Please enter a valid number"),
  avatar: z.string().optional(),
});

type Props = {
  setStep: Dispatch<SetStateAction<Steps>>;
  onAdd: (student: Student) => void;
};

export const StepInformations = ({ setStep, onAdd }: Props) => {
  const { informations, setInformations } = useCheckoutStore((state) => state);
  const [editedAvatar, setEditedAvatar] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...informations },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setInformations({
      ...values,
      avatar: editedAvatar || "",
      grade1: parseFloat(values.grade1).toString(),
      grade2: parseFloat(values.grade2).toString(),
      gradeFinal: 0,
      active: false,
    });
    setStep("finish");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedAvatar(reader.result as string); // Armazena a imagem em Base64
        setInformations({ ...informations, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grade1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade 1</FormLabel>
                <FormControl>
                  <Input type="number" {...field} max={10} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grade2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade 2</FormLabel>
                <FormControl>
                  <Input type="number" {...field} max={10} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatar"
            render={({}) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <Input
                    className="file:p-0.5 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white file:disabled:opacity-50 file:disabled:pointer-events-none dark:file:bg-slate-700 dark:hover:file:bg-slate-800"
                    id="file_input"
                    type="file"
                    onChange={handleFileChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between mt-4">
          <Button variant="link" onClick={() => setStep("user")}>
            Return
          </Button>
          <Button type="submit">Conclude</Button>
        </div>
      </form>
    </Form>
  );
};
