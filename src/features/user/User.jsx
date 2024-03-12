import { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UserDelete from "./UserDelete";
import UserTable from "./UserTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import userData from "../../userData";

const initUser = {
  name: "",
  email: "",
  age: "",
  number: "",
};

const domain = "http://localhost:3000";

const User = () => {
  //Functionality states
  const [users, setUsers] = useState([]);
  const [fetchErr, setFetchErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [selEditUser, setSelEditUser] = useState(initUser);
  const [selDeleteUser, setSelDeleteUser] = useState(null);
  const [userIndex, setUserIndex] = useState(0);

  //Get Method: get all users from db
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${domain}/users`);
      if (!response.ok) {
        setIsLoading(false);
        setFetchErr("Something went wrong, check the url");
        return;
      }
      const resData = await response.json();
      setUsers(resData);
    } catch (error) {
      setFetchErr("Something went wrong, check the url or try again later");
    }
    setIsLoading(false);
  };

  const setIndex = (user) => {
    const allUsers = [...users];
    const userIndex = allUsers.findIndex((obj) => obj.id === user.id);
    setUserIndex(userIndex);
  };

  const getPrevOrNextUser = (clickEvent) => {
    const selectedUsers = [...users];
    let prevOrNextUser = {};

    if (userIndex !== -1) {
      if (clickEvent === "next") {
        prevOrNextUser = selectedUsers[userIndex + 1];
      }

      if (clickEvent === "previous") {
        prevOrNextUser = selectedUsers[userIndex - 1];
      }
      setSelEditUser(prevOrNextUser);
      setIndex(prevOrNextUser);
    }
  };

  //Post method
  const addUser = async (user) => {
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
  const deleteUser = async (id) => {
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
  const editUser = async (user) => {
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

  const onAddEditUser = (user) => {
    setShowUserForm(!showUserForm);
    setSelEditUser(user || initUser);
    setIndex(user);
  };

  const onCancelUserForm = () => {
    setShowUserForm(!showUserForm);
  };

  const onDeleteUser = (user) => {
    setSelDeleteUser(user);
  };

  const onCancelUserDelete = () => {
    setSelDeleteUser(null);
  };

  const deleteSelectedUser = (user) => {
    deleteUser(user.id);
    setSelDeleteUser(null);
  };

  const saveUser = async (user) => {
    const usersArray = [...users];

    if (user.id) {
      const index = usersArray.findIndex((obj) => obj.id === user.id);
      usersArray[index] = user;
      editUser(user);
    } else {
      const userWithId = await addUser(user);
      usersArray.push(userWithId);
    }
    setUsers(usersArray);
    onAddEditUser();
  };

  const getDuplicateDataError = (user) => {
    let duplicateErr = {};

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
            users={users}
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
