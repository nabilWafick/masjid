import { Button } from "@/components/ui/button";
import { Check, Pencil, Trash2, X } from "lucide-react";
import Users from "@/models/user.model";

interface UsersTableProps {
  users: Users[];
  onEdit: (user: Users) => void;
  onDelete: (id: string) => void;
}

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  return (
    <div className="rounded-lg">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Firstnames</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-center">Admin</th>
            <th className="px-4 py-2 text-left">Phone Number</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.firstnames}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2 flex justify-center w-full text-center">
                {user.isAdmin ? (
                  <Check className="text-green-500" />
                ) : (
                  <X className="text-red-500" />
                )}
              </td>
              <td className="px-4 py-2">{user.phoneNumber}</td>
              <td className="px-4 py-2">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/50 hover:bg-primary/10 text-primary"
                    onClick={() => onEdit(user)}
                  >
                    <Pencil className="w-4 h-4 mr-2 text-primary" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => onDelete(user.id!)}
                  >
                    <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
