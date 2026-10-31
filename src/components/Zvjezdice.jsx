const Zvjezdice = ({ ocjena }) => {
  const pune = Math.round(ocjena);

  return (
    <span className="zvjezdice" aria-hidden="true">
      {"★".repeat(pune)}
      {"☆".repeat(5 - pune)}
    </span>
  );
};

export default Zvjezdice;
