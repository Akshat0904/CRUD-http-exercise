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

const User = () => {
  //Functionality states
  const [users, setUsers] = useState([]);
  const [fetchErr, setFetchErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [selEditUser, setSelEditUser] = useState(initUser);
  const [selDeleteUser, setSelDeleteUser] = useState(null);

  //Get Method: get all users from db
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          setIsLoading(false);
          setFetchErr("Something went wrong, check the url");
          return;
        }
        const resData = await response.json();
        console.log(resData);
        setUsers(resData);
      } catch (error) {
        console.log(error.message);
        setFetchErr("Something went wrong, check the url or try again later");
      }
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    return <p className="text-black">Please wait until your data presented</p>;
  }

  if (fetchErr) {
    toast.error(fetchErr, {
      position: "top-center",
      autoClose: 8000,
      theme: "dark",
    });
  }

  const getPrevOrNextUser = (user, getUser) => {
    const selectedUsers = [...users];

    const index = selectedUsers.findIndex((obj) => obj.id === user.id);
    let prevOrNextUser = {};

    if (index !== -1) {
      if (getUser === "next") {
        {
          index === selectedUsers.length - 1
            ? (prevOrNextUser = selectedUsers[index])
            : (prevOrNextUser = selectedUsers[index + 1]);
        }
      }

      if (getUser === "previous") {
        {
          index === 0
            ? (prevOrNextUser = selectedUsers[index])
            : (prevOrNextUser = selectedUsers[index - 1]);
        }
      }
      setSelEditUser(prevOrNextUser);
      console.log(prevOrNextUser);
      return prevOrNextUser;
    }
  };

  //Post method
  const addUserToDb = async (user) => {
    let resData = {};
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/users", {
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
      console.log(resData);
    } catch (error) {
      // console.log(error.message);
      setFetchErr("Something went wrong, check the url or try again later");
    }
    setIsLoading(false);
    return resData;
  };

  //Delete method
  const deleteUserFromDb = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/users/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setIsLoading(false);
        setFetchErr("Something went wrong, check the url");
        return;
      }
      const resData = await response.json();
      console.log(resData, "deleted successfully");
    } catch (error) {
      setFetchErr("Something went wrong, check the url or try again later");
    }
    setIsLoading(false);
  };

  //Put method
  const editUserInDb = async (user) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/users/${user.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        setIsLoading(false);
        setFetchErr("Something went wrong, check the url or try again later");
        return;
      }
      const resData = await response.json();
      console.log(resData);
    } catch (error) {
      setFetchErr("Something went wrong, check the url or try again later");
    }
    setIsLoading(false);
  };

  const onAddEditUser = (user) => {
    setShowUserForm(!showUserForm);
    setSelEditUser(user || initUser);
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
    deleteUserFromDb(user.id);
    const updatedUserList = users.filter((obj) => obj.id !== user.id);
    setUsers(updatedUserList);
    setSelDeleteUser(null);
  };

  const saveUser = async (user) => {
    const usersArray = [...users];
    console.log(usersArray);

    if (user.id) {
      const index = usersArray.findIndex((obj) => obj.id === user.id);
      usersArray[index] = user;
      editUserInDb(user);
    } else {
      const userWithId = await addUserToDb(user);
      console.log(userWithId);
      1;
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

  const isFirstUser =
    selEditUser.id && users.length > 0 && users[0].id === selEditUser.id;
  const isLastUser =
    selEditUser.id &&
    users.length > 0 &&
    users[users.length - 1].id === selEditUser.id;

  return (
    <>
      {(fetchErr && <ToastContainer />) || (
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
          isFirstUser={isFirstUser}
          isLastUser={isLastUser}
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
