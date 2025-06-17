import React, { useState } from "react";
import { FormControl, OutlinedInput, Chip, Box, FormHelperText } from "@mui/material";

/**
 * SuiTagInput with an outlined text field appearance.
 * Shows existing tags as chips inside the input (startAdornment).
 *
 * @param {object} props
 * @param {string[]} props.tags - The current list of tags (e.g. phone numbers).
 * @param {(newTags: string[]) => void} props.onChange - Called when user adds/removes a tag.
 * @param {string} [props.placeholder] - Placeholder text (shown if not disabled).
 * @param {boolean} [props.disabled] - If true, user cannot add or remove tags.
 * @param {"text" | "email" | "phone" | "fax"} [props.type] - For basic validation. Defaults to "text".
 */
function SuiTagInput({
  tags = [],
  onChange = () => {},
  placeholder = "Add new item",
  disabled = false,
  type = "text",
}) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  // Basic validators for demonstration:
  const validate = (val) => {
    if (!val.trim()) return "";
    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(val) ? "" : "Invalid email format";
    }
    if (type === "phone" || type === "fax") {
      // Example phone/fax validation: only digits, spaces, plus, parentheses, hyphens
      const phoneRegex = /^[0-9+()\-\s]+$/;
      return phoneRegex.test(val) ? "" : "Invalid phone/fax format";
    }
    return "";
  };

  const handleAddTag = (val) => {
    const err = validate(val);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    onChange([...tags, val]);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    // If user pressed Enter / Tab / Space
    if (e.key === "Enter" || e.key === "Tab" || e.key === " ") {
      if (inputValue.trim() !== "") {
        e.preventDefault();
        handleAddTag(inputValue.trim());
      }
    }
  };

  const handleBlur = () => {
    // If there's leftover text on blur, add as tag
    if (inputValue.trim() !== "") {
      handleAddTag(inputValue.trim());
    }
  };

  const handleDelete = (tagToDelete) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    onChange(updatedTags);
  };

  return (
    <FormControl
      variant="outlined"
      fullWidth
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          backgroundColor: disabled ? "#f6f6f6 !important" : "#fff",
          color: "#2c2c2c !important",
        },
        "& .MuiChip-root": {
          height: 20,
          fontSize: "0.75rem",
          padding: "0 4px",
          background: disabled ? "#ffffff00": "",
          border: disabled ? "1px solid #9a9191": "",
          borderRadius: "12px",
          "& .MuiChip-label": {
            padding: "0 6px",
          },
        },
      }}
    >
      <OutlinedInput
        disabled={disabled}
        placeholder={!disabled ? placeholder : ""}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          "& .MuiOutlinedInput-input": {
            flexGrow: 1,
            minWidth: 50,
            padding: "6px 8px",
          },
        }}
        startAdornment={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 0.5,
            }}
          >
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={!disabled ? () => handleDelete(tag) : undefined}
                disabled={disabled}
              />
            ))}
          </Box>
        }
      />
      {error && (
        <FormHelperText error sx={{ marginLeft: "14px" }}>
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default SuiTagInput;
