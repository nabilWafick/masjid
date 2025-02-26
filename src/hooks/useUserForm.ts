import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import UsersService from "@/services/users.service";
import Users from "@/models/user.model";
import { userFormSchema, UserFormData } from "@/validations/userFormSchema";

export const useUserForm = (
  locale: string,
  initialData?: UserFormData,
  onClose?: () => void
) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      id: initialData?.id,
      name: initialData?.name ?? "",
      firstnames: initialData?.firstnames ?? "",
      email: initialData?.email ?? "",
      isAdmin: initialData?.isAdmin ?? false,
      phoneNumber: initialData?.phoneNumber ?? "",
      password: initialData?.password ?? undefined,
    },
  });

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        form.setValue(
          key as keyof UserFormData,
          initialData[key as keyof UserFormData]
        );
      });
    }
  }, [initialData, form]);

  const { toast } = useToast();

  const onSubmit = async (data: UserFormData) => {
    try {
      console.log("Form submitted:", data);

      const user = new Users(
        data.name,
        data.firstnames,
        data.email,
        data.phoneNumber,
        data.isAdmin,
        new Date(),
        new Date(),
        data.password,
        data.id
      );
      const usersService = UsersService.init(locale);

      if (user.id) {
        await usersService.update(user.id, user);

        toast({
          title: "Success",
          description: "User updated successfully",
        });
      } else {
        await usersService.add(user);

        toast({
          title: "Success",
          description: "User added successfully",
        });
      }

      if (onClose) onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
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
