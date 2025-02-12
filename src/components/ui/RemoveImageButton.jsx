import ModalCheckAgreement from "../modals/ModalCheckAgreement";
import axios from "axios";

const RemoveImageButton = ({ user, setImageUrl }) => {
  const handleDeleteImage = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/user/delete/image",
        {
          data: {
            id: user.id,
          },
        }
      );
      setImageUrl(null);
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error deleting image:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <ModalCheckAgreement
      titleText={"Are you sure you wnat to remove your image"}
      btnText="remove"
      ownSize={true}
      func={handleDeleteImage}
    >
      <button className="btn bg-red-500 py-2 w-full rounded-full font-semibold text-lg">
        remove
      </button>
    </ModalCheckAgreement>
  );
};

export default RemoveImageButton;
