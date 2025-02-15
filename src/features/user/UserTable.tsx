import Button from "../../shared/UI/Button";
import { IUser } from "../../types/user";

/**
 * Props for UserTable component
 * @interface UserTableProps
 */
interface UserTableProps {
  /** Callback for add/edit user action */
  onAddEditUser: (user: IUser | null) => void;
  /** Callback for delete user action */
  onDeleteUser: (user: IUser) => void;
  /** Array of users to display */
  users: IUser[];
}

/**
 * User Table Component
 * @component UserTable
 * @description Displays users in a table format with edit and delete actions
 *
 * @features
 * - Displays user list in tabular format
 * - Add new user button
 * - Edit and delete actions per user
 * - Responsive design with Tailwind CSS
 */
const UserTable: React.FC<UserTableProps> = ({
  onAddEditUser,
  onDeleteUser,
  users,
}) => {
  return (
    <div className="absolute w-[80%] h-full top-10 flex flex-col justify-left items-center font-Poppins -z-10">
      <Button bgColor="bg-blue-700" onClick={() => onAddEditUser(null)}>
        Add User
      </Button>
      <table className="relative w-[80%] text-left rounded-lg shadow-lg ">
        <thead className="text-base text-gray-700 uppercase bg-gray-200">
          <tr>
            <th className="px-6 py-3">Sr No.</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Age</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Number</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index} className="bg-white border-b ">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.age}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.number}</td>
                <td className="px-6 py-4 flex items-center gap-2 justify-center">
                  <Button
                    bgColor="bg-blue-700"
                    onClick={() => onAddEditUser(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    bgColor="bg-red-500"
                    onClick={() => onDeleteUser(user)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
