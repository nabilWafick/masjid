import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import UsersService from "@/services/users.service";
import Users from "@/models/user.model";
import { userFormSchema, UserFormData } from "@/validations/userFormSchema";

export const useUserForm = (locale: string, initialData?: UserFormData) => {
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

  return {
    form,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    register: form.register,
    setValue: form.setValue,
    watch: form.watch,
  };
};
