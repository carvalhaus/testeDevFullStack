import "./userCard.css";
import userIcon from "../../assets/userIcon.svg";
import Actions from "../Actions/actions";

function UserCard({ id, name, email, loggedUserLevel }) {
  return (
    <div className="userCard">
      <div className="userInfo">
        <img src={userIcon} width={44} height={44} className="userIcon" />

        <div>
          <p className="userEmail">{email}</p>
          <p className="userName">{name} </p>
        </div>
      </div>
      <Actions id={id} loggedUserLevel={loggedUserLevel} />
    </div>
  );
}

export default UserCard;
