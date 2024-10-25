"use client";
import { Box, Button, ThemeProvider } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import React, { useState, useEffect } from "react";

export default function Elevator() {
  const [activeFloor, setActiveFloor] = useState(1); // Start from the first floor
  const [elevatorRequests, setElevatorRequests] = useState([]); // State to store the requests

  const floors = [5, 4, 3, 2, 1, "G"]; // Floors to display

  const handleUpDown = (item, direction) => {
    console.log("Requested floor:", item, "Direction:", direction);

    // Add the floor and direction to the array of requests
    setElevatorRequests((prevRequests) => [
      ...prevRequests,
      { floor: item, direction: direction },
    ]);

    // Simulate elevator moving
    setTimeout(() => {
      setActiveFloor(item);
      console.log("Elevator moved to floor:", item);
    }, 2000);
  };

  // Log the updated elevatorRequests when the state changes
  useEffect(() => {
    console.log("Updated Requests: ", elevatorRequests);
    const needle = 8;

    const closest = elevatorRequests.reduce((closest, current) => {
      return Math.abs(current.floor - activeFloor) <
        Math.abs(closest.floor - activeFloor)
        ? current
        : closest;
    });

    return closest;

    // console.log(closest);
  }, [elevatorRequests]);

  return (
    <div className="flex">
      <Box
        className="elevator-div"
        component="section"
        sx={{
          p: 4,
          border: "2px solid grey",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          backgroundColor: "#f0f0f0",
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        {floors.map((item) => (
          <React.Fragment key={item}>
            <ThemeProvider
              theme={{
                palette: {
                  primary: {
                    main: "#007FFF",
                    dark: "#0066CC",
                  },
                  secondary: {
                    light: "#ff7961",
                    main: "#f44336",
                    dark: "#ba000d",
                    contrastText: "#000",
                  },
                },
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 1,
                  bgcolor:
                    activeFloor === item ? "secondary.main" : "primary.main",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow:
                    activeFloor === item
                      ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                      : "none",
                  transition: "all 0.3s ease",
                }}
                onClick={() => setActiveFloor(item)} // Change color on click
              >
                {item}
              </Box>
            </ThemeProvider>
            <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
              <Button
                onClick={() => handleUpDown(item, "up")}
                variant="contained"
                color="secondary"
                sx={{ fontSize: "0.875rem" }}
              >
                <KeyboardArrowUp />
              </Button>
              <Button
                onClick={() => handleUpDown(item, "down")}
                variant="contained"
                color="secondary"
                sx={{ fontSize: "0.875rem" }}
              >
                <KeyboardArrowDown />
              </Button>
            </Box>
          </React.Fragment>
        ))}
      </Box>

      {/* Display the elevator requests */}
      <Box
        sx={{
          width: "100%",
          mt: 4,
          p: 2,
          border: "1px solid #ccc",
          borderRadius: 1,
          backgroundColor: "#fafafa",
        }}
      >
        <h3>Elevator Requests:</h3>
        <ul>
          {elevatorRequests.map((request, index) => (
            <li key={index}>
              Floor: {request.floor}, Direction: {request.direction}
            </li>
          ))}
        </ul>
      </Box>
    </div>
  );
}
