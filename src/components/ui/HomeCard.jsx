import profile from "../../assets/images/profile.jpg";

const HomeCard = ({ card, index, activeIndex }) => {
  return (
    <div
      key={card.id}
      className={`card ${index === activeIndex ? "active" : ""}`}
    >
      <div className="card-image">
        <img src={profile} alt="Card" />
      </div>
      <div className="card-content">
        <p className="card-title">{card.title}</p>
        <p className="card-text">{card.text}</p>
      </div>
    </div>
  );
};

export default HomeCard;
