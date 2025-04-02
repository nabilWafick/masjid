/*
"use client";

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
import { validateMultiLanguageField } from "@/lib/utils";

type MultiLanguageField = {
  ar: string;
  en: string;
  fr: string;
};

type SermonData = {
  id?: string;
  topic: MultiLanguageField;
  description: MultiLanguageField;
  video: string;
  preachedById: string;
  publishedById: string;
};

type SermonFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: SermonData;
  onSubmit: (data: SermonData) => Promise<void>;
  onSuccess?: () => void;
};

const SermonForm = ({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  onSuccess,
}: SermonFormProps) => {
  const [formData, setFormData] = React.useState<SermonData>({
    topic: initialData?.topic || { ar: "", en: "", fr: "" },
    description: initialData?.description || { ar: "", en: "", fr: "" },
    video: initialData?.video || "",
    preachedById: initialData?.preachedById || "",
    publishedById: initialData?.publishedById || "",
  });
  const [errors, setErrors] = React.useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const isUpdateMode = Boolean(initialData);

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string[]> = {};
    let isValid = true;

    // Validate multi-language fields
    ["topic", "description"].forEach((field) => {
      const mlErrors = validateMultiLanguageField(
        formData[field as keyof SermonData] as MultiLanguageField,
        field
      );
      if (mlErrors.length > 0) {
        newErrors[field] = mlErrors;
        isValid = false;
      }
    });

    // Validate other fields
    if (!formData.video.trim()) {
      newErrors.video = ["Video URL is required"];
      isValid = false;
    }
    if (!formData.preachedById.trim()) {
      newErrors.preachedById = ["Preacher ID is required"];
      isValid = false;
    }
    if (!formData.publishedById.trim()) {
      newErrors.publishedById = ["Publisher ID is required"];
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    field: keyof SermonData,
    value: string | MultiLanguageField,
    lang?: string
  ) => {
    setFormData((prev) => {
      if (lang && typeof value === "string") {
        return {
          ...prev,
          [field]: {
            ...(prev[field] as MultiLanguageField),
            [lang]: value,
          },
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });

    // Clear related errors
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: [],
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
          topic: { ar: "", en: "", fr: "" },
          description: { ar: "", en: "", fr: "" },
          video: "",
          preachedById: "",
          publishedById: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderMultiLanguageInputs = (
    field: keyof SermonData,
    label: string
  ) => {
    const value = formData[field] as MultiLanguageField;
    const fieldErrors = errors[field] || [];

    return (
      <div className="grid gap-4">
        <label className="text-sm font-medium">{label}</label>
        {Object.keys(value).map((lang) => (
          <div key={lang} className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-medium">
              {lang.toUpperCase()}
            </span>
            <div className="col-span-3">
              <input
                value={value[lang as keyof MultiLanguageField]}
                onChange={(e) => handleChange(field, e.target.value, lang)}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
          </div>
        ))}
        {fieldErrors.map((error, index) => (
          <span key={index} className="text-sm text-red-500">
            {error}
          </span>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isUpdateMode ? "Edit Sermon" : "Add New Sermon"}
            </DialogTitle>
            <DialogDescription>
              {isUpdateMode
                ? "Edit the sermon information below."
                : "Fill in the information to add a new sermon."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {renderMultiLanguageInputs("topic", "Topic")}
            {renderMultiLanguageInputs("description", "Description")}

            <div className="grid gap-2">
              <label className="text-sm font-medium">Video URL</label>
              <input
                value={formData.video}
                onChange={(e) => handleChange("video", e.target.value)}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              />
              {errors.video?.map((error, index) => (
                <span key={index} className="text-sm text-red-500">
                  {error}
                </span>
              ))}
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Preacher ID</label>
              <input
                value={formData.preachedById}
                onChange={(e) => handleChange("preachedById", e.target.value)}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              />
              {errors.preachedById?.map((error, index) => (
                <span key={index} className="text-sm text-red-500">
                  {error}
                </span>
              ))}
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Publisher ID</label>
              <input
                value={formData.publishedById}
                onChange={(e) => handleChange("publishedById", e.target.value)}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              />
              {errors.publishedById?.map((error, index) => (
                <span key={index} className="text-sm text-red-500">
                  {error}
                </span>
              ))}
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

const AdminSermonPage = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedSermon, setSelectedSermon] = React.useState<
    SermonData | undefined
  >();
  const [sermons, setSermons] = React.useState<
    Array<SermonData & { id: string }>
  >([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      const response = await fetch("/api/sermons", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch sermons");
      const data = await response.json();
      setSermons(data);
    } catch (error) {
      console.error("Error fetching sermons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data: SermonData) => {
    try {
      const response = await fetch("/api/sermons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create sermon");
      fetchSermons();
    } catch (error) {
      console.error("Error creating sermon:", error);
      throw error;
    }
  };

  const handleUpdate = async (data: SermonData) => {
    try {
      const response = await fetch(`/api/sermons/${selectedSermon?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update sermon");
      fetchSermons();
    } catch (error) {
      console.error("Error updating sermon:", error);
      throw error;
    }
  };

  const handleEdit = (sermon: SermonData & { id: string }) => {
    setSelectedSermon(sermon);
    setDialogOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedSermon(undefined);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Sermon Management</h1>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Sermon
        </Button>
      </div>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Topic (EN)</th>
              <th className="px-4 py-2 text-left">Description (EN)</th>
              <th className="px-4 py-2 text-left">Video</th>
              <th className="px-4 py-2 text-left">Preacher ID</th>
              <th className="px-4 py-2 text-left">Publisher ID</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sermons.map((sermon) => (
              <tr key={sermon.id} className="border-t">
                <td className="px-4 py-2">{sermon.topic.en}</td>
                <td className="px-4 py-2">{sermon.description.en}</td>
                <td className="px-4 py-2">{sermon.video}</td>
                <td className="px-4 py-2">{sermon.preachedById}</td>
                <td className="px-4 py-2">{sermon.publishedById}</td>
                <td className="px-4 py-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(sermon)}
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

      <SermonForm
        open={dialogOpen}
        onOpenChange={handleOpenChange}
        initialData={selectedSermon}
        onSubmit={selectedSermon ? handleUpdate : handleAdd}
        onSuccess={() => {
          console.log("Operation successful");
        }}
      />
    </div>
  );
};

export default AdminSermonPage;

*/
