import React, { useState } from "react";
import Select, { StylesConfig, components } from "react-select";
import { Checkbox, Typography, Chip, Badge } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import colors from "@elas/shared/assets/theme/base/colors";
import { SoftButton } from "@elas/shared/components";

export interface StateOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  options: StateOption[];
  value: StateOption[];
  onChange: (selectedOptions: StateOption[]) => void;
  placeholder?: string;
  styles?: StylesConfig<StateOption, true>;
  variant?: string;
  isMulti?: boolean;
  loadMore?: () => void;
  color?: string;
  size?: "small" | "medium" | "large";
  sx?: object;
}

const defaultSelectStyles: StylesConfig<StateOption, true> = {
  control: (provided) => ({
    ...provided,
    margin: 8,
    padding: "8px",
    borderRadius: 4,
    borderColor: "#ccc",
    fontSize: "14px",
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
  }),
};

const Option = (props: any) => {
  const { data, isSelected, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 12px",
        backgroundColor: isSelected ? "#f0f0f0" : "white",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      <Checkbox checked={isSelected} style={{ marginRight: 8 }} color="primary" />
      <Typography style={{ fontSize: "14px" }}>{data.label}</Typography>
    </div>
  );
};

const MultiValue = () => null;

const DropdownComponent = ({
  options,
  value,
  onChange,
  placeholder = "Search...",
  styles = defaultSelectStyles,
  variant = "dropdown",
  isMulti = true,
  loadMore = () => {},
  color,
  size,
  sx,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const triggerRef = React.useRef<HTMLDivElement | null>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);

  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [isOpen]);

  const getSelectedLabel = (selectedOptions: StateOption[]) => {
    if (!selectedOptions.length) return placeholder;
    const firstSelected = selectedOptions[0]?.label;
    const additionalCount = selectedOptions.length - 1;
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {placeholder} -
        <Chip
          label={firstSelected}
          color="primary"
          size="small"
          style={{
            margin: "0px 8px",
            backgroundColor: colors.info.main,
            fontWeight: 100,
            fontSize: "8px",
          }}
        />
        {additionalCount > 0 && (
          <Badge
            badgeContent={`+${additionalCount}`}
            color="secondary"
            style={{
              borderRadius: "50%",
              padding: "0px 4px",
            }}
          />
        )}
      </div>
    );
  };

  const renderTarget = () => {
    if (variant === "More") {
      return (
        <SoftButton
          ref={triggerRef}
          variant="contained"
          color="info"
          size="medium"
          onClick={() => setIsOpen((prev) => !prev)}
          startIcon={<AddIcon />}
          sx={{
            height: "30px",
            width: "75px",
            minWidth: "auto !important",
            minHeight: "auto !important",
          }}
        >
          More
        </SoftButton>
      );
    }
    return (
      <div
        ref={triggerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: 4,
          cursor: "pointer",
          backgroundColor: "#fff",
          fontSize: "14px",
          height: "35px",
          width: "100%",
          maxWidth: 230,
        }}
      >
        <Typography style={{ flex: 1, fontSize: "14px" }}>
          {getSelectedLabel(value)}
        </Typography>
        {isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
      </div>
    );
  };

  return (
    <div style={{ position: "relative", ...sx }}>
      {renderTarget()}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            zIndex: 999,
            backgroundColor: "#fff",
            borderRadius: 4,
            marginTop: 4,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 4px 11px rgba(0,0,0,0.1)",
            width: variant === "More" ? 300 : triggerWidth,
          }}
        >
          <Select<StateOption, true>
            autoFocus
            isMulti
            menuIsOpen
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            filterOption={(candidate, rawInput) =>
              candidate.label.toLowerCase().includes(rawInput.toLowerCase())
            }
            onMenuScrollToBottom={loadMore}
            options={options}
            placeholder={placeholder}
            menuPortalTarget={document.body}
            // menuPosition="fixed"
            // styles={{
            //   ...styles,
            //   menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            // }}
            value={value}
            onChange={(newValues) => {
              const updated = Array.isArray(newValues)
                ? newValues
                : newValues
                  ? [newValues]
                  : [];
              onChange(updated);
            }}
            onInputChange={(val) => setInputValue(val)}
            onBlur={() => setIsOpen(false)}
            components={{ Option, MultiValue }}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
