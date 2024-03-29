/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Button from "../../shared/UI/Button";

const UserForm = ({
  onCancel,
  selectedUser,
  saveUser,
  getDupErr,
  getPrevOrNextUser,
  userIndex,
  userRecordLength,
}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(selectedUser);
    setFormErr({});
  }, [selectedUser]);

  const [formErr, setFormErr] = useState({});

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const validateUser = (user) => {
    let error = {};

    if (user.name.trim() === "") {
      error.name = "name should not be blank";
    }

    if (user.age < 18 || user.age > 100) {
      error.age = "Age must be greater than 18";
    }

    if (!emailRegex.test(user.email)) {
      error.email = "email is not valid";
    }

    if (user.number.length !== 10) {
      error.number = "number must have 10 digits";
    }

    if (Object.keys(error).length !== 0) {
      return error;
    }

    const dupErr = getDupErr(user);

    if (Object.keys(dupErr).length !== 0) {
      error = {
        ...error,
        ...dupErr,
      };
    }

    return error;
  };

  const checkValidation = (user) => {
    const errorObj = validateUser(user);

    if (Object.keys(errorObj).length != 0) {
      setFormErr(errorObj);
      return;
    }

    saveUser(user);
  };

  const setPrevOrNextUser = (clickEvent) => {
    getPrevOrNextUser(clickEvent);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const prevBtnColor = (userIndex === 0 && "bg-red-400") || "bg-red-500";
  const NextBtnColor =
    (userIndex === userRecordLength - 1 && "bg-red-400") || "bg-red-500";

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-700 opacity-80"></div>
      <div className="fixed translate-x-[50%] translate-y-[20%] mx-auto flex items-center justify-center bg-white bg-opacity-100 w-[650px] rounded-lg font-Poppins font-medium z-50">
        {selectedUser.id && (
          <Button
            bgColor={`ml-4 mr-20 ${prevBtnColor}`}
            onClick={() => setPrevOrNextUser("previous")}
            disabled={userIndex === 0}
          >
            Previous
          </Button>
        )}
        <div className="flex flex-col  justify-center items-center">
          <h2 className="font-bold">User Form</h2>
          <form action="" className="flex flex-col gap-4 text-left p-4">
            <label htmlFor="Name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              id="Name"
              className="border-gray-300 border-2 rounded-sm"
              value={user.name}
              name="name"
              onChange={onChange}
            />
            {formErr.name && (
              <span className="text-red-500">{formErr.name}</span>
            )}
            <label htmlFor="age" className="font-semibold">
              Age
            </label>
            <input
              type="number"
              id="age"
              className="border-gray-300 border-2 rounded-sm"
              value={user.age}
              name="age"
              onChange={onChange}
            />
            {formErr.age && <span className="text-red-500">{formErr.age}</span>}
            <label htmlFor="Email" className="font-semibold">
              Email
            </label>
            <input
              type="text"
              id="Email"
              className="border-gray-300 border-2 rounded-sm"
              value={user.email}
              name="email"
              onChange={onChange}
            />
            {formErr.email && (
              <span className="text-red-500">{formErr.email}</span>
            )}
            <label htmlFor="contactNum" className="font-semibold">
              Number (10 Digits)
            </label>
            <input
              type="number"
              id="contactNum"
              className="border-gray-300 border-2 rounded-sm"
              value={user.number}
              name="number"
              onChange={onChange}
            />
            {formErr.number && (
              <span className="text-red-500">{formErr.number}</span>
            )}
            <div className="mx-auto flex gap-2">
              <Button
                bgColor="bg-blue-700"
                onClick={() => checkValidation(user)}
              >
                Save
              </Button>
              <Button bgColor="bg-red-500" onClick={() => onCancel()}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
        {selectedUser.id && (
          <Button
            bgColor={`mr-4 ml-20 ${NextBtnColor}`}
            onClick={() => setPrevOrNextUser("next")}
            disabled={userIndex === userRecordLength - 1}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserForm;
