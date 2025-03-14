import Button from "../../shared/UI/Button";
import { IUser } from "../../types/user";

interface UserDeleteProps {
  user: IUser;
  deleteUser: (user: IUser) => void;
  onCancel: () => void;
}

/**
 * User Delete Confirmation Component
 * @component
 * @description Modal component for confirming user deletion
 */
const UserDelete: React.FC<UserDeleteProps> = ({
  user,
  deleteUser,
  onCancel,
}) => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-700 opacity-80"></div>
      <div className="fixed translate-x-[50%] translate-y-[20%] top-10 bg-gray-300 w-[600px] gap-6 rounded-lg mx-auto flex flex-col justify-center items-center font-Poppins z-50">
        <h2 className="  font-bold">Delete User</h2>
        <p className="font-bold text-lg">
          Are You sure, You want to delete the user {user.name}?
        </p>
        <div className="flex flex-row gap-5">
          <Button bgColor="bg-red-500" onClick={() => deleteUser(user)}>
            Confirm
          </Button>
          <Button bgColor="bg-blue-700" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDelete;
