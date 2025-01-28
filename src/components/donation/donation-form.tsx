"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "../ui/alert";

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  frequency: z.enum(["once", "monthly", "yearly"], {
    required_error: "Please select a frequency",
  }),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

// Create a type from the schema
type FormValues = z.infer<typeof formSchema>;

// Custom hook for form handling
export const useDonationForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      frequency: "once",
      amount: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // You can handle the API call or other submission logic here
      console.log("Form submitted:", data);

      // Example API call:
      // await submitDonation(data);

      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle submission error
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    register: form.register,
    setValue: form.setValue,
    watch: form.watch,
  };
};

export function DonationForm() {
  const { onSubmit, errors, isSubmitting, register, setValue, watch } =
    useDonationForm();
  const currentAmount = watch("amount");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Faire un don</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label>Montant du don</Label>
            <div className="grid grid-cols-3 gap-4">
              {["500", "1000", "2000", "5000"].map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant="outline"
                  className={
                    currentAmount === amount ? "ring-2 ring-primary" : ""
                  }
                  onClick={() => setValue("amount", amount)}
                >
                  {amount}f
                </Button>
              ))}
            </div>
            <Input placeholder="Autre montant" {...register("amount")} />
            {errors.amount && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{errors.amount.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-4">
            <Label>Fréquence</Label>
            <RadioGroup
              defaultValue="once"
              onValueChange={(value: string) =>
                setValue("frequency", value as "once" | "monthly" | "yearly")
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="once" id="once" />
                <Label htmlFor="once">Une fois</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Mensuel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="yearly" />
                <Label htmlFor="yearly">Annuel</Label>
              </div>
            </RadioGroup>
            {errors.frequency && (
              <Alert variant="destructive">
                <AlertDescription>{errors.frequency.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" {...register("firstName")} />
                {errors.firstName && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>
                      {errors.firstName.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" {...register("lastName")} />
                {errors.lastName && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>
                      {errors.lastName.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{errors.email.message}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full">
            {isSubmitting ? "Traitement..." : "Faire un don"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
