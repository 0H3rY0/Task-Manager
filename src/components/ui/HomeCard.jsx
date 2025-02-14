const HomeCard = ({ card, index, activeIndex }) => {
  return (
    <div
      key={card.id}
      className={`card ${index === activeIndex ? "active" : ""}`}
    >
      <div className="card-image">
        <img src={card.image.url} alt="Card" />
      </div>
      <div className="card-content">
        <p className="card-title">{card.title}</p>
        <p className="card-text">{card.description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
