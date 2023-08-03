import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Spinner, Pagination, Form, Button } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./UserList.css";
import "aos/dist/aos.css";
import AOS from "aos";
import UserDetails from "./UserDetails/UserDetails";
import { ImSearch } from "react-icons/im";

const ITEMS_PER_PAGE = 8; //setting 8 user per page
const MAX_PAGES = 10; // setting for now 10 pages

const UserList = () => {
  // ALL STATE CODES....
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  // const [filteredUsers, setFilteredUsers] = useState([]);
  // const [selectedUser, setSelectedUser] = useState(null);

  // FETCHING THE API USING AXIOS ....
  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get("https://602e7c2c4410730017c50b9d.mockapi.io/users")
      .then((response) => {
        // Removing duplicate users based on their IDs
        const uniqueUsers = response.data.reduce((accumulator, currentUser) => {
          const existingUser = accumulator.find(
            (user) => user.id === currentUser.id
          );
          if (!existingUser) {
            accumulator.push(currentUser);
          }
          return accumulator;
        }, []);
        setUsers(uniqueUsers.reverse()); // Reversing  the array to get data in descending order
        setLoading(false);
      })
      // Error handling codes here....
      .catch((error) => {
        setLoading(false);
        setError("Error fetching data. Please try again later.");
        console.error("Error fetching data: ", error);
      });
  }, []);

  // AOS CODE ....
  useEffect(() => {
    AOS.init();
  }, []);

  // SEARCHING CODE HERE ....
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.profile.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Resets current page to 1 when search query changes..
  }, [users, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalUsers = filteredUsers.length;
  const totalPages = Math.min(
    Math.ceil(totalUsers / ITEMS_PER_PAGE),
    MAX_PAGES
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalUsers);
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  // CLOSE CROSS CODES..
  const handleCloseDetails = () => {
    setSelectedUser(null); // Clear the selectedUser to close the UserDetails component
  };
  return (
    <div className="background-behind">
      <div className="background">
        {/* Loader codes here */}
        {loading ? (
          <div className="loader-container">
            <Spinner
              animation="border"
              role="status"
              className="loader text-white"
            />
          </div>
        ) : (
          <div className="full-list">
            <div className="user-list-title">User List</div>
            {/* Search Bar */}
            <Form className="d-flex search-bar">
              <Form.Control
                type="search"
                placeholder="Search Users"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button variant="outline-light" disabled>
                <ImSearch />
              </Button>
            </Form>
            {paginatedUsers.length === 0 ? (
              <div className="empty-message">No data to show.</div>
            ) : (
              <ListGroup className="user-list" data-aos="flip-left">
                {paginatedUsers.map((user) => (
                  <ListGroup.Item
                    key={user.id}
                    className={`user-item mb-2 rounded-3 ${
                      selectedUser && selectedUser.id === user.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="user-info" data-aos="fade-up">
                      {/* Using Lazy Loader on Image */}
                      <LazyLoadImage
                        src={user.avatar}
                        alt={user.profile.username}
                        effect="blur"
                        className="user-avatar rounded-5"
                        placeholderSrc="/placeholder.png"
                      />
                      {/* User Full name  */}
                      <span
                        className="user-name text-black"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                      >
                        {user.profile.firstName} {user.profile.lastName}
                      </span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
            {/* Pagination code here */}
            <div className="pagination-container mt-5">
              <Pagination className="black-and-white-theme">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                    className=""
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </div>
        )}
        {/* Passing the selected user data to UserDetails components */}
        <div className="user-details ">
          <UserDetails user={selectedUser} onClose={handleCloseDetails} />
        </div>
        <div className="modal-for-small-devices">
          <UserDetails user={selectedUser} onClose={handleCloseDetails} />
        </div>
      </div>
    </div>
  );
};

export default UserList;
