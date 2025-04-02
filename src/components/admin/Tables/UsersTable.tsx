import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, MoreHorizontal, Pencil, Trash2, X } from "lucide-react";
import Users from "@/models/user.model";

interface UsersTableProps {
  users: Users[];
  onEdit: (user: Users) => void;
  onDelete: (id: string) => void;
}

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Firstnames</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Admin</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.firstnames}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-center">
                {user.isAdmin ? (
                  <Check className="mx-auto text-green-500" />
                ) : (
                  <X className="mx-auto text-red-500" />
                )}
              </TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onEdit(user)}
                      className="flex items-center cursor-pointer"
                    >
                      <Pencil className="mr-2 h-4 w-4 text-primary" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(user.id!)}
                      className="flex items-center text-red-500 focus:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/*
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
                    className="text-red-500 border-red-500/50 hover:bg-red-500/10"
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
*/
