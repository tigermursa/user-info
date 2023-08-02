import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./UserDetails.css";
import "aos/dist/aos.css";
import AOS from "aos";

const UserDetails = ({ user, onClose }) => {
  // AOS CODE....
  useEffect(() => {
    AOS.init();
  }, []);

  if (!user) {
    return <p>Sorry, there is no user</p>;
  }

  return (
    <div data-aos="fade-up">
      <button className=" close-icon" onClick={onClose}>
        &#x2715;
      </button>
      <div className="user-details-header">
        <h3 className="user-details-title display-none-in-small-screen">
          User Details
        </h3>
      </div>
      {/* THE USER DETAIL CARD AREA */}
      <div className="user-details-container">
        {/* Lazy load image for optimize website */}
        <LazyLoadImage
          src={user.avatar}
          alt={user.profile.username}
          effect="blur"
          className="detail-image"
        />
        <div className="all-info">
          {/* username */}
          <h4 className="mt-2 mb-4 user-name">@{user.profile.username}</h4>
          {/* Bio */}
          <h5 className="mb-4">Bio: "{user.Bio}" </h5>
          {/* Full name */}
          <h1 className="mb-4">
            {user.profile.firstName} {user.profile.lastName}
          </h1>
          {/* Job Title */}
          <h4> {user.jobTitle}</h4>
          {/* Email */}
          <p>Email : {user.profile.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
