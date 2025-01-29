const UploadImageButton = ({ handleUpdateImageUrl }) => {
  return (
    <>
      <input
        type="file"
        id="upload"
        className="hidden"
        onChange={handleUpdateImageUrl}
      />
      <label
        htmlFor="upload"
        className="btn text-center bg-green-500 py-2 w-3/6 rounded-full font-semibold text-lg "
      >
        Upload
      </label>
    </>
  );
};

export default UploadImageButton;
