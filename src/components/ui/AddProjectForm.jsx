const AddProjectForm = () => {
  return (
    <form action="">
      <label htmlFor="Title" className="font-bold text-lg text-slate-700 ml-1">
        Title
      </label>
      <input
        type="text"
        className="classicInput mb-3"
        placeholder="Write a title "
      />

      <label
        htmlFor="Description"
        className="font-bold text-lg text-slate-700 ml-1"
      >
        Description
      </label>
      <input
        type="text"
        className="classicInput mb-3"
        placeholder="Write a Description"
      />

      <label
        htmlFor="Deadline"
        className="font-bold text-lg text-slate-700 ml-1"
      >
        Deadline
      </label>
      <input
        type="date"
        className="classicInput mb-3 text-slate-400"
        placeholder="Write a title"
      />

      <label
        htmlFor="Importance"
        className="font-bold text-lg text-slate-700 ml-1"
      >
        Importance
      </label>
      <select className="block text-slate-400">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low" defaultChecked>
          Low
        </option>
      </select>
    </form>
  );
};

export default AddProjectForm;
