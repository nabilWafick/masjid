"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PageHeader } from "@/components/ui/page-header";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  object: z.string().min(2, "Object must be at least 3 characters"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

// Create a type from the schema
type FormValues = z.infer<typeof formSchema>;

// Custom hook for form handling
export const useDonationForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      object: "",
      message: "",
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

export default function ContactPage() {
  const { onSubmit, errors, isSubmitting, register, setValue, watch } =
    useDonationForm();
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Contact"
        description="Contactez-nous, nous vous ferons un plaisir de vous répondre "
      />

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-7">
          <span className="text-lg text-muted-foreground font-semibold">
            Mosquée Dare SALAM
          </span>

          <div className="text-sm text-muted-foreground space-y-2">
            <p>Qt Cité La Victoire</p>
            <p>masjid.daresalam@gmail.com</p>
            <p>00229 0190524895</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                className="mt-1"
                {...register("firstName")}
              />
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
              <Input id="lastName" className="mt-1" {...register("lastName")} />
              {errors.lastName && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{errors.lastName.message}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="mt-1"
              {...register("email")}
            />
            {errors.email && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{errors.email.message}</AlertDescription>
              </Alert>
            )}
          </div>
          <div>
            <Label htmlFor="object">Objet</Label>
            <Input id="object" className="mt-1" {...register("object")} />
            {errors.object && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{errors.object.message}</AlertDescription>
              </Alert>
            )}
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" className="mt-1" {...register("message")} />
            {errors.message && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{errors.message.message}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
