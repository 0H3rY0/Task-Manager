import ModalConfirmPassowrd from "../modals/ModalConfirmPassowrd";

const EditPassword = ({ user }) => {
  return (
    <>
      <label
        htmlFor="username"
        className="font-semibold text-slate-800 text-lg"
      >
        Password
      </label>
      <p className="w-full flex justify-between items-center mt-5 mb-14">
        <span>•••••••</span>
        <ModalConfirmPassowrd id={user.id}>
          <span className="text-green-500 cursor-pointer underline">
            Change
          </span>
        </ModalConfirmPassowrd>
      </p>
    </>
  );
};

export default EditPassword;
