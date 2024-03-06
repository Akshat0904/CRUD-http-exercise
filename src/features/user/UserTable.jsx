/* eslint-disable react/prop-types */
import Button from "../../shared/UI/Button";

const UserTable = ({ onAddEditUser, onDeleteUser, users }) => {
  return (
    <div className="fixed w-[80%]  flex flex-col justify-left items-center top-20 font-Poppins -z-10 ">
      <Button bgColor="bg-blue-700 " onClick={() => onAddEditUser(null)}>
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
                <td className="px-6 py-4 flex items-center justify-center">
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
