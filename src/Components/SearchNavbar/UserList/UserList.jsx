import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image, ListGroup, Spinner, Pagination } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./UserList.css";
import "aos/dist/aos.css";
import AOS from "aos";

const ITEMS_PER_PAGE = 10;
const MAX_PAGES = 9; // Set the maximum number of pagination pages

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get("https://602e7c2c4410730017c50b9d.mockapi.io/users")
      .then((response) => {
        // Remove duplicate users based on their IDs
        const uniqueUsers = response.data.reduce((accumulator, currentUser) => {
          const existingUser = accumulator.find(
            (user) => user.id === currentUser.id
          );
          if (!existingUser) {
            accumulator.push(currentUser);
          }
          return accumulator;
        }, []);
        setUsers(uniqueUsers);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError("Error fetching data. Please try again later.");
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalUsers = users.length;
  const totalPages = Math.min(
    Math.ceil(totalUsers / ITEMS_PER_PAGE),
    MAX_PAGES
  ); // Set the total pages to a maximum of 9

  // Update startIndex to start from the 11th item
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 10;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalUsers);
  const paginatedUsers = users.slice(startIndex, endIndex);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="background-behind">
      <div className="background">
        {loading ? (
          <div className="loader-container">
            <Spinner
              animation="border"
              role="status"
              className="loader text-white"
            />
          </div>
        ) : (
          <div>
            <div className="user-list-title">User List</div>
            {paginatedUsers.length === 0 ? (
              <div className="empty-message">No data to show.</div>
            ) : (
              <ListGroup className="user-list" data-aos="flip-left">
                {paginatedUsers.map((user) => (
                  <ListGroup.Item
                    key={user.id}
                    className="user-item mb-2 rounded-3"
                  >
                    <div className="user-info">
                      <LazyLoadImage
                        src={user.avatar}
                        alt={user.profile.username}
                        effect="blur" // Add a blur effect while loading
                        className="user-avatar rounded-5"
                        placeholderSrc="/placeholder.png" // Replace with a placeholder image URL
                        data-aos="fade-up"
                      />
                      <span className="user-name"  data-aos="fade-up">{user.profile.username}</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
            <div className="pagination-container">
              <Pagination>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </div>
        )}
        <div className="user-details"></div>
      </div>
    </div>
  );
};

export default UserList;
