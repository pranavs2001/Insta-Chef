import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHome} from "@fortawesome/free-solid-svg-icons";

function TeamProfile(props) {

  return(
    <div className="grid-row" id={props.id}>
      <div className="grid-col">
        <div className="profile-img-container">
          <img className="profile-img" src={props.profileImgSrc} alt={props.imgAlt} />
        </div>
      </div>
      <div className="grid-col">
        <div className="member-content">
          <h3> {props.name}
              {props.pronouns === "" ? (<></>) : (<span className="pronouns"> ({props.pronouns}) </span>)}
          </h3>
          <p className="member-position">
            {props.memberPosition}
          </p>

          <ul class="profile-link-list">
            <li>
              <a target="_blank" rel="noopener noreferrer" class="profile-link" href={`mailto:${props.email}`}>
                {<FontAwesomeIcon icon={faEnvelope} style={{ paddingRight: "5px" }} size="lg" />}
                {props.email}
              </a>
            </li>
            <li>
              <a target="_blank" rel="noopener noreferrer" class="profile-link" href={`https://github.com/${props.githubUsername}`}>
                <i class="fab fa-github fa-1x" style={{ paddingRight: "5px" }} ></i>
                {props.githubUsername}
              </a>
            </li>
            <li>
              {props.linkedinUsername === "" ? (<></>) : (
                <a target="_blank" rel="noopener noreferrer" class="profile-link" href={`https://linkedin.com/in/${props.linkedinUsername}/`}>
                  <i class="fab fa-linkedin fa-1x" style={{ paddingRight: "5px" }} ></i>
                  {props.linkedinUsername}
                </a>
                )
              }
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TeamProfile;