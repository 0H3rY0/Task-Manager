const HomeTaskTableOption = ({
  handleTimeFilter,
  setUnderlineActive,
  underlineActive,
  timePeriod,
}) => {
  return (
    <span
      onClick={() => {
        handleTimeFilter(timePeriod);
        setUnderlineActive(1);
      }}
      className={
        `hover:underline decoration-blue-500 decoration-2 underline-offset-8 cursor-pointer ` +
        ` ${
          underlineActive === 1 &&
          " underline decoration-blue-500 decoration-2 underline-offset-8 cursor-pointer"
        } `
      }
    >
      Today
    </span>
  );
};

export default HomeTaskTableOption;
