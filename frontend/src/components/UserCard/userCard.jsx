import "./userCard.css";
import userIcon from "../../assets/userIcon.svg";
import Actions from "../Actions/actions";

function UserCard({ user, loggedUserId, loggedUserLevel }) {
  return (
    <div className="userCard">
      <div className="userInfo">
        <img src={userIcon} width={44} height={44} className="userIcon" />

        <div>
          <p className="userEmail">{user.email}</p>
          <p className="userName">{user.name} </p>
        </div>
      </div>
      <Actions
        loggedUserId={loggedUserId}
        loggedUserLevel={loggedUserLevel}
        user={user}
      />
    </div>
  );
}

export default UserCard;
