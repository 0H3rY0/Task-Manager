const HomeTaskTableMonth30DaysOption = ({
  monthTasks,
  setUnderlineActive,
  underlineActive,
}) => {
  return (
    <span
      onClick={() => {
        monthTasks();
        setUnderlineActive(3);
      }}
      className={
        `hover:underline decoration-blue-500 decoration-2 underline-offset-8 cursor-pointer ` +
        ` ${
          underlineActive === 3 &&
          "underline decoration-blue-500 decoration-2 underline-offset-8 cursor-pointer"
        } `
      }
    >
      30 days
    </span>
  );
};

export default HomeTaskTableMonth30DaysOption;
