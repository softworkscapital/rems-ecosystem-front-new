import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faCloudSun,
  faCloudMoon,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../config";
import Swal from "sweetalert2";

const getTimeBasedData = () => {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();

  const formatTime = () => {
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };
  const greetingStyle = {
    fontSize: '2rem', // Adjust the size as needed
    color: '#0bad0b', // Optional: set the color
  };

  const timePeriods = [
    {
      condition: hour >= 5 && hour < 12,
      greeting: "Good Morning",
      icon: faSun,
      theme: {
        primary: "#0bad0b",
        secondary: "#0bad0b",
        background: "#FFFFFF",
      },
    },
    {
      condition: hour >= 12 && hour < 17,
      greeting: "Good Afternoon",
      icon: faCloudSun,
      theme: { primary: "#0bad0b", secondary: "#B0E0E6", background: "#fff" },
    },
    {
      condition: hour >= 17 && hour < 21,
      greeting: "Good Evening",
      icon: faCloudMoon,
      theme: { primary: "#0bad0b", secondary: "#DDA0DD", background: "#fff" },
    },
    {
      condition: hour >= 21 || hour < 5,
      greeting: "Good Night",
      icon: faMoon,
      theme: { primary: "#0bad0b", secondary: "#483D8B", background: "#fff" },
    },
  ];

  const currentPeriod = timePeriods.find((period) => period.condition) || {
    greeting: "Hello",
    icon: faClock,
    theme: { primary: "#0bad0b", secondary: "#666666", background: "#FFFFFF" },
  };

  return { ...currentPeriod, currentTime: formatTime() };
};

const ProfileCard = () => {
  const timeData = getTimeBasedData();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMember = () => {
    const userId = localStorage.getItem("user");
    if (!userId) {
      Swal.fire({
        text: "User ID not found in local storage!",
        icon: "error",
      });
      setIsLoading(false);
      return;
    }

    fetch(`${API_URL}/members/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((resp) => {
        setIsLoading(false);
        if (resp.length === 1) {
          setUser(resp[0]);
          localStorage.setItem("member", JSON.stringify(resp[0]));
        } else {
          Swal.fire({
            text: "User Terminated!",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err.message);
        setIsLoading(false);
        // Swal.fire({
        //   text: "System Boot Failed, Please check your network connection!",
        //   icon: "error",
        // });
      });
  };

  useEffect(() => {
    fetchMember();
  }, []); // Fetch user data on component mount

  if (isLoading) {
    return <div>Loading Please Wait...</div>; // Optionally display a loading state
  }

  if (!user) {
    return <div>No user data available.</div>; // Handle no user case
  }

  return (
    <div
      className="card shadow mb-4"
      style={{
        background: timeData.theme.background,
        minHeight: '200px', // Ensure the height is 200px
      }}
    >
      <div className="card-body" style={{ padding: '20px' }}> {/* Reduced padding */}
        <div className="row align-items-center">
          <div className="col-auto">
            <img
              src={"https://picsum.photos/800/400?random=3"}
              alt="User Profile"
              className="img-fluid rounded-circle mb-2" // Reduced margin
              style={{ width: "100px", height: "100px" }} // Reduced size
            />
          </div>
          <div className="col">
            <div className="text-container" style={{ padding: '3px 49px' }}> {/* Reduced padding */}
              <div className="text-center text-md-left">
                <h1
                  className="font-weight-bold"
                  style={{ color: timeData.theme.primary, fontSize: '1.5rem' }} // Reduced font size
                >
                  {timeData.greeting}
                </h1>
                <h5 className="font-weight-bold text-gray-900" style={{ fontSize: '0.9rem' }}>{`${user.name} ${user.surname}`}</h5> {/* Reduced font size */}
                <p className="text-gray-900" style={{ fontSize: '0.8rem' }}>{`Package: ${user.packageType}`}</p> {/* Reduced font size */}
                <p className="text-gray-900" style={{ fontSize: '0.8rem' }}>{`${user.account_category} at ${user.company_name}`}</p> {/* Reduced font size */}
              </div>
            </div>
          </div>
          <div className="col-auto">
            <FontAwesomeIcon
              icon={timeData.icon}
              size="3x" // Reduced icon size
              style={{ color: timeData.theme.primary }}
            />
          </div>
        </div>
        <div className="mt-2 text-center"> {/* Reduced margin top */}
          <div className="text-xs font-weight-bold text-gray-900 text-uppercase mb-1">
            Time to Pension
          </div>
          <div className="progress">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${user.pensionTime}%` }}
              aria-valuenow={user.pensionTime}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div className="mt-1 text-right"> {/* Reduced margin top */}
            <small style={{ fontSize: '0.7rem' }}>{`${100 - user.pensionTime}% remaining`}</small> {/* Reduced font size */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
