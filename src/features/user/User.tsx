import { useState } from "react";
import UserForm from "./UserForm";
import UserDelete from "./UserDelete";
import UserTable from "./UserTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IUser } from "../../types/user";

/**
 * Interface for User data structure
 * @interface
 */
// interface ApiError {
//   message: string;
// }

/**
 * Initial user state
 */
const initUser: IUser = {
  name: "",
  email: "",
  age: "",
  number: "",
};

const domain = "http://localhost:3001";

/**
 * User Management Component
 * @component User
 * @description Main component for handling user CRUD operations
 *
 * @features
 * - Fetch users from API
 * - Add new users with validation
 * - Edit existing users
 * - Delete users with confirmation
 * - Navigate between users in edit mode
 * - Handle duplicate email/phone validation
 * - Loading states and error handling
 * - Toast notifications
 *
 * @example
 * ```tsx
 * <User />
 * ```
 */
const User: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [fetchErr, setFetchErr] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showUserForm, setShowUserForm] = useState<boolean>(false);
  const [selEditUser, setSelEditUser] = useState<IUser>(initUser);
  const [selDeleteUser, setSelDeleteUser] = useState<IUser | null>(null);
  const [userIndex, setUserIndex] = useState<number>(0);

  /**
   * Fetches users from the API
   * @async
   * @function fetchUsers
   * @throws {Error} When API request fails
   * @returns {Promise<void>}
   */
  //   const fetchUsers = async (): Promise<void> => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(`${domain}/users`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch users");
  //       }
  //       const resData: IUser[] = await response.json();
  //       setUsers(resData);
  //     } catch (error) {
  //       setFetchErr(error instanceof Error ? error.message : "An error occurred");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  const setIndex = (user: IUser) => {
    const allUsers = [...users];
    const userIndex = allUsers.findIndex((obj) => obj.id === user.id);
    setUserIndex(userIndex);
  };

  const getPrevOrNextUser = (clickEvent: string) => {
    const selectedUsers = [...users];
    let prevOrNextUser = {};

    if (userIndex !== -1) {
      if (clickEvent === "next") {
        prevOrNextUser = selectedUsers[userIndex + 1];
      }

      if (clickEvent === "previous") {
        prevOrNextUser = selectedUsers[userIndex - 1];
      }
      setSelEditUser(prevOrNextUser as IUser);
      setIndex(prevOrNextUser as IUser);
    }
  };

  /**
   * Adds a new user to the system
   * @async
   * @function addUser
   * @param {IUser} user - User data to be added
   * @returns {Promise<IUser>} Newly created user with ID
   */
  const addUser = async (user: IUser) => {
    let resData = {};
    setIsLoading(true);
    try {
      const response = await fetch(`${domain}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        setIsLoading(false);
        setFetchErr("Something went wrong, check the url");
        return;
      }
      resData = await response.json();
    } catch (error) {
      setFetchErr("Something went wrong, check the url or try again later");
    }
    setIsLoading(false);
    return resData;
  };

  //Delete method
  const deleteUser = async (id: string) => {
    const allUsers = [...users];
    setIsLoading(true);
    try {
      const response = await fetch(`${domain}/users/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setIsLoading(false);
        setFetchErr("Something went wrong, check the url");
        return;
      }
      const resData = await response.json();
      const updatedUserList = allUsers.filter((obj) => obj.id !== resData.id);
      setUsers(updatedUserList);
    } catch (error) {
      setFetchErr("Something went wrong, check the url or try again later");
    }
    setIsLoading(false);
  };

  //Put method
  const editUser = async (user: IUser) => {
    let resData;
    setIsLoading(true);
    try {
      const response = await fetch(`${domain}/users/${user.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        setIsLoading(false);
        setFetchErr("Something went wrong, check the url or try again later");
        return;
      }
      resData = await response.json();
    } catch (error) {
      setFetchErr("Something went wrong, check the url or try again later");
    }
    setIsLoading(false);
    return resData;
  };

  const onAddEditUser = (user: IUser | null) => {
    setShowUserForm(!showUserForm);
    setSelEditUser(user || initUser);
    setIndex(user || initUser);
  };

  const onCancelUserForm = () => {
    setShowUserForm(!showUserForm);
  };

  const onDeleteUser = (user: IUser) => {
    setSelDeleteUser(user);
  };

  const onCancelUserDelete = () => {
    setSelDeleteUser(null);
  };

  const deleteSelectedUser = (user: IUser) => {
    if (user.id) {
      deleteUser(user.id);
      setSelDeleteUser(null);
    }
  };

  const saveUser = async (user: IUser) => {
    const usersArray = [...users];

    if (user.id) {
      const index = usersArray.findIndex((obj) => obj.id === user.id);
      usersArray[index] = user;
      editUser(user);
    } else {
      const userWithId = await addUser(user);
      usersArray.push(userWithId as IUser);
    }
    setUsers(usersArray);
    onAddEditUser(user);
  };

  const getDuplicateDataError = (user: IUser) => {
    let duplicateErr: { email?: string; number?: string } = {};

    if (users.some((e) => e.email === user.email && e.id !== user.id)) {
      duplicateErr.email = "email is already exist, try another one";
    }

    if (users.some((e) => e.number === user.number && e.id !== user.id)) {
      duplicateErr.number = "number is already exist, try another one";
    }

    return duplicateErr;
  };

  if (fetchErr) {
    toast.error(fetchErr, {
      position: "top-center",
      autoClose: 8000,
      theme: "dark",
    });
  }

  return (
    <>
      {(isLoading && (
        <p className="text-black">Please wait until your data presented</p>
      )) ||
        (fetchErr && <ToastContainer />) || (
          <UserTable
            onAddEditUser={onAddEditUser}
            onDeleteUser={onDeleteUser}
            users={users as IUser[]}
          />
        )}

      {showUserForm && (
        <UserForm
          onCancel={onCancelUserForm}
          selectedUser={selEditUser}
          saveUser={saveUser}
          getDupErr={getDuplicateDataError}
          getPrevOrNextUser={getPrevOrNextUser}
          userIndex={userIndex}
          userRecordLength={users.length}
        />
      )}
      {selDeleteUser && (
        <UserDelete
          user={selDeleteUser}
          deleteUser={deleteSelectedUser}
          onCancel={onCancelUserDelete}
        />
      )}
    </>
  );
};

export default User;
