import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './TimePicker.css';

function BasicTimePicker({ label = '', value = null, onChange }) {
  const time = dayjs(value, "h:mm:ss A");
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={time}
        onAccept={onChange}
        PopperProps={{
          disablePortal: true, // Keeps modal within the same DOM hierarchy
          modifiers: [
            {
              name: "preventOverflow",
              options: {
                boundary: "viewport",
              },
            },
            {
              name: "offset",
              options: {
                offset: [0, 8], // Adjust positioning if needed
              },
            },
          ],
        }}
        slots={{
          textField: (params) => <TextField {...params} />,
        }}
      />
    </LocalizationProvider>
  );
}

export default React.memo(BasicTimePicker);
