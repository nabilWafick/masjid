import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";

// Updated FormData type to include date
type FormData = {
  username: string;
  email: string;
  message: string;
  date: string; // Using string for date
};

type DialogFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: FormData;
  onSubmit: (data: FormData) => Promise<void>;
  onSuccess?: () => void;
};

const DialogForm = ({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  onSuccess,
}: DialogFormProps) => {
  const [formData, setFormData] = React.useState<FormData>({
    username: initialData?.username || "",
    email: initialData?.email || "",
    message: initialData?.message || "",
    date: initialData?.date || new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = React.useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const isUpdateMode = Boolean(initialData);

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData.message) {
      newErrors.message = "Message is required";
      isValid = false;
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onOpenChange(false);
      onSuccess?.();

      if (!isUpdateMode) {
        setFormData({
          username: "",
          email: "",
          message: "",
          date: new Date().toISOString().split("T")[0],
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isUpdateMode ? "Edit Item" : "Add New Item"}
            </DialogTitle>
            <DialogDescription>
              {isUpdateMode
                ? "Edit the information below."
                : "Fill in the information to add a new item."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="username"
                className="text-right text-sm font-medium"
              >
                Username
              </label>
              <div className="col-span-3">
                <input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                />
                {errors.username && (
                  <span className="text-sm text-red-500">
                    {errors.username}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right text-sm font-medium">
                Email
              </label>
              <div className="col-span-3">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                />
                {errors.email && (
                  <span className="text-sm text-red-500">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right text-sm font-medium">
                Date
              </label>
              <div className="col-span-3">
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                />
                {errors.date && (
                  <span className="text-sm text-red-500">{errors.date}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="message"
                className="text-right text-sm font-medium"
              >
                Message
              </label>
              <div className="col-span-3">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                  rows={4}
                />
                {errors.message && (
                  <span className="text-sm text-red-500">{errors.message}</span>
                )}
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
};

const AdminPage = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<
    FormData | undefined
  >();

  // Example data with dates
  const [items, setItems] = React.useState<FormData[]>([
    {
      username: "john_doe",
      email: "john@example.com",
      message: "Hello world",
      date: "2024-02-01",
    },
    {
      username: "jane_doe",
      email: "jane@example.com",
      message: "Hi there",
      date: "2024-02-02",
    },
  ]);

  const handleAdd = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setItems((prev) => [...prev, data]);
  };

  const handleUpdate = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setItems((prev) =>
      prev.map((item) => (item.email === selectedItem?.email ? data : item))
    );
  };

  const handleEdit = (item: FormData) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedItem(undefined);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Message</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{item.username}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{item.message}</td>
                <td className="px-4 py-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DialogForm
        open={dialogOpen}
        onOpenChange={handleOpenChange}
        initialData={selectedItem}
        onSubmit={selectedItem ? handleUpdate : handleAdd}
        onSuccess={() => {
          console.log("Operation successful");
        }}
      />
    </div>
  );
};

export default AdminPage;
