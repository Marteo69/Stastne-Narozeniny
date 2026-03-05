import { useNavigate } from "react-router-dom";

export default function Win() {
  const navigate = useNavigate();

  return (
    <div className="Win">
      <h1>Vsechno nejlepsi k narozeninam!</h1>
      <p className="win-subtitle"></p>
      <button className="go-back-btn" onClick={() => navigate("/")}>
        Zpatky na puzzle
      </button>
    </div>
  );
}
