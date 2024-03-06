import { useState } from "react";
import UserForm from "./UserForm";
import UserDelete from "./UserDelete";
import UserTable from "./UserTable";
import userData from "../../userData";

const initUser = {
  id: 0,
  name: "",
  email: "",
  age: "",
  number: "",
};

const User = () => {
  //Functionality states
  const [users, setUsers] = useState(userData);
  const [showUserForm, setShowUserForm] = useState(false);
  const [selEditUser, setSelEditUser] = useState(initUser);
  const [selDeleteUser, setSelDeleteUser] = useState(null);

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
    const updatedUserList = users.filter((obj) => obj.id !== user.id);
    setUsers(updatedUserList);
    setSelDeleteUser(null);
  };

  const saveUser = (user) => {
    const usersArray = [...users];
    console.log(usersArray);

    if (user.id) {
      const index = usersArray.findIndex((obj) => obj.id === user.id);
      usersArray[index] = user;
    } else {
      user.id = Math.max(...users.map((obj) => obj.id)) + 1;
      console.log(user.id);
      console.log(usersArray);
      usersArray.push(user);
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

  return (
    <>
      <UserTable
        onAddEditUser={onAddEditUser}
        onDeleteUser={onDeleteUser}
        users={users}
      />
      {showUserForm && (
        <UserForm
          onCancel={onCancelUserForm}
          selectedUser={selEditUser}
          saveUser={saveUser}
          getDupErr={getDuplicateDataError}
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
