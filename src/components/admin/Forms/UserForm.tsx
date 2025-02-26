"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useUserForm } from "@/hooks/useUserForm";
import { UserFormData } from "@/validations/userFormSchema";

type UserFormProps = {
  locale: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: UserFormData;
  onSubmit?: (data: UserFormData) => Promise<void>;
  onSuccess?: () => void;
};

export function UserForm({
  locale,
  open,
  onOpenChange,
  initialData,
}: UserFormProps) {
  const { form, onSubmit, errors, isSubmitting, register, setValue } =
    useUserForm(locale, initialData, () => onOpenChange(false));

  const isUpdateMode = Boolean(initialData);

  useEffect(() => {
    if (!open && !initialData) {
      form.reset();
    }
  }, [open, initialData, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-muted z-99999 max-h-[700px] overflow-scroll">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isUpdateMode ? "Edit User" : "Add New User"}
            </DialogTitle>
            <DialogDescription>
              {isUpdateMode
                ? "Edit the user information below."
                : "Fill in the information to add a new user."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstnames">Firstnames</Label>
                <Input id="firstnames" {...register("firstnames")} />
                {errors.firstnames && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>
                      {errors.firstnames.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{errors.name.message}</AlertDescription>
                  </Alert>
                )}
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

              <div>
                <Label htmlFor="phoneNumber">Phone</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>
                      {errors.phoneNumber.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>
                      {errors.password.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="flex justify-start items-center space-x-4">
                <Checkbox
                  id="isAdmin"
                  checked={form.watch("isAdmin")}
                  onCheckedChange={(checked) =>
                    setValue("isAdmin", checked === true)
                  }
                  {...register("isAdmin")}
                />

                <Label htmlFor="isAdmin">Admin</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? isUpdateMode
                  ? "Saving..."
                  : "Creating..."
                : isUpdateMode
                ? "Save Changes"
                : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
