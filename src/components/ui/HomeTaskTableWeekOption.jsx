const HomeTaskTableWeekOption = ({
  handleTimeFilter,
  setUnderlineActive,
  underlineActive,
  timePeriod,
}) => {
  return (
    <span
      onClick={() => {
        handleTimeFilter(timePeriod);
        setUnderlineActive(2);
      }}
      className={
        `hover:underline decoration-blue-500 decoration-2 underline-offset-8 cursor-pointer ` +
        ` ${
          underlineActive === 2 &&
          "underline decoration-blue-500 decoration-2 underline-offset-8 cursor-pointer"
        } `
      }
    >
      week
    </span>
  );
};

export default HomeTaskTableWeekOption;
