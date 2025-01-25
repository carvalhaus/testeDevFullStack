import "./userCard.css";
import userIcon from "../../assets/userIcon.svg";
import Actions from "../Actions/actions";

function UserCard() {
  return (
    <div className="userCard">
      <div className="userInfo">
        <img src={userIcon} width={44} height={44} className="userIcon" />

        <div>
          <p className="userEmail">Lorem Ipson</p>
          <p className="userName">Lorem Ipson Lorem IpsonLorem IpsonLorem Ipson </p>
        </div>
      </div>

      <Actions />
    </div>
  );
}

export default UserCard;
