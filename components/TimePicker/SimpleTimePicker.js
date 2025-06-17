import React, { useState, useEffect } from "react";

const SimpleTimePicker = ({ label = "", value, onChange, startTime=null, endTime=null, toggleSnackbar }) => {
  const [time, setTime] = useState("");

  const formatTime = (input, type) => {
    if (typeof input === "string" && input.includes(":")) {
      return input.slice(0, 5);
    } else if (input === null && type === 'end') {
      return `23:59`;
    } else if (input === null && type === 'start') {
      return `00:00`;
    } else {
      const date = new Date(input);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    }
  };


  useEffect(() => {
    if (value) {
      setTime(formatTime(value));
    } else {
      setTime("");
    }
  }, [value]);

  const handleChange = (event) => {
    const selectedTime = event.target.value;

    if (selectedTime) {
      setTime(selectedTime);
      const [hours, minutes] = selectedTime.split(":");
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      onChange(date.getTime());
    } else {
      toggleSnackbar({content : `Please select a time between ${formatTime(startTime)} ${endTime ? `and ${formatTime(endTime)}`: '11:59 PM'} `});
    }
  };

  return (
    <div>
      <input
        type="time"
        id={label}
        value={time}
        onChange={handleChange}
        autoFocus
        min={startTime ? formatTime(startTime) : undefined}
        max={endTime ? formatTime(endTime) : undefined}
        style={{
          width: "100%",
          textAlign: "center",
          border: "none",
          borderRadius: "4px",
          paddingLeft: "13px",
        }}
      />
    </div>
  );
};

export default SimpleTimePicker;
