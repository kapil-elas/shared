// src/components/AsyncDropdown.tsx

import React from "react";
import DropdownComponent, { StateOption } from "./DropdownComponent";

export interface AsyncDropdownProps {
  options: StateOption[];
  loadMore: () => void;
  onInputChange: (search: string) => void;
  hasMore: boolean;

  value: StateOption[];
  onChange: (selected: StateOption[]) => void;
  placeholder?: string;
  isMulti?: boolean;
  onBlur?: () => void;
  disabled?: boolean;
}

const AsyncDropdown: React.FC<AsyncDropdownProps> = ({
  options,
  loadMore,
  onInputChange,
  hasMore,

  value,
  onChange,
  placeholder = "Select...",
  isMulti = true,
  onBlur,
  disabled = false,
}) => {
  return (
    <DropdownComponent
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={onChange}
      loadMore={loadMore}
      onInputChange={onInputChange}
      isMulti={isMulti}
      isDisabled={disabled}
      size="small"
      styles={{
        control: (prov) => ({
          ...prov,
          padding: "4px 4px",
          fontSize: "0.75rem",
          minHeight: "32px",
        }),
        valueContainer: (prov) => ({ ...prov, padding: 0 }),
        indicatorsContainer: (prov) => ({ ...prov, padding: 0 }),
      }}
      // onBlur={onBlur}
      // Pass hasMore so the “loadMore” logic can know if more pages exist:
      {...(hasMore ? {} : {
        // If hasMore is false, the Dropdown can hide its “load more” trigger.
        // Your DropdownComponent may need to inspect this flag itself.
      })}
    />
  );
};

export default AsyncDropdown;
