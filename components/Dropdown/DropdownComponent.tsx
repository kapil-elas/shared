import React, { useState, useRef, useEffect } from "react";
import Select, { StylesConfig } from "react-select";
import { Checkbox, Typography, Chip, Badge } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import colors from "@elas/shared/assets/theme/base/colors";
import { SoftButton } from "@elas/shared/components";

export interface StateOption {
  label: string;
  value: string;
  id: number;
}

export interface DropdownProps {
  options: StateOption[];
  value: StateOption[];
  onChange: (selectedOptions: StateOption[]) => void;
  placeholder?: string;
  styles?: StylesConfig<StateOption, true>;
  variant?: string;
  isMulti?: boolean;
  isDisabled?: boolean;
  loadMore?: () => void;
  color?: string;
  size?: "small" | "medium" | "large";
  sx?: object;
  className?: string;
  onInputChange?: (input: string) => void;
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
  className,
  loadMore = () => { },
  // color,
  // size,
  // sx,
  isDisabled = false,
  onInputChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

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
          style={{ margin: "0px 8px", backgroundColor: colors.info.main, fontWeight: 600 }}
        />
        {additionalCount > 0 && (
          <Badge
            badgeContent={`+${additionalCount}`}
            color="secondary"
            style={{
              borderRadius: "50%",
              backgroundColor: "#f50057",
              padding: "0px 8px",
              fontSize: "12px",
              fontWeight: "bold",
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
            marginLeft: "10px",
          }}
        >
          More
        </SoftButton>
      );
    }
    const cursorStyle = isDisabled ? "not-allowed" : "pointer";
    const opacityStyle = isDisabled ? 0.6 : 1;
    return (
      <div
        ref={triggerRef}
        onClick={() => {
          if (!isDisabled) setIsOpen((prev) => !prev);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          border: "0.0625rem solid #d2d6da",
          cursor: cursorStyle,
          width: "100%",
          height: "auto",
          padding: "0.5rem 0.75rem",
          fontSize: "0.875rem",
          fontWeight: "400",
          lineHeight: "1.4",
          borderRadius: "0.5rem",
          opacity: opacityStyle,
        }}
      >
        <Typography style={{ flex: 1, fontSize: "12px" }}>{getSelectedLabel(value)}</Typography>
        {isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
      </div>
    );
  };

  return (
    <div ref={wrapperRef} className={className} style={{ position: "relative" }}>
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
          {isMulti ? (
            <Select<StateOption, true>
              autoFocus
              menuIsOpen
              isMulti
              isDisabled={isDisabled}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              filterOption={(candidate, rawInput) =>
                candidate.label?.toLowerCase().includes(rawInput?.toLowerCase())
              }
              onMenuScrollToBottom={loadMore}
              options={options}
              placeholder={placeholder}
              styles={styles}
              value={value}
              onChange={(newValues) => {
                const updated = Array.isArray(newValues) ? newValues : newValues ? [newValues] : [];
                onChange(updated);
              }}
              onInputChange={(val) => {
                setInputValue(val);
                onInputChange?.(val);
              }}
              components={{ Option, MultiValue }}
            />
          ) : (
            <Select<StateOption, true>
              autoFocus
              menuIsOpen
              isDisabled={isDisabled}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              filterOption={(candidate, rawInput) =>
                candidate.label?.toLowerCase().includes(rawInput?.toLowerCase())
              }
              onMenuScrollToBottom={loadMore}
              options={options}
              placeholder={placeholder}
              styles={styles}
              value={value}
              onChange={(newValues) => {
                const updated = Array.isArray(newValues) ? newValues : newValues ? [newValues] : [];
                onChange(updated);
              }}
              onInputChange={(val) => {
                setInputValue(val);
                onInputChange?.(val);
              }}
              components={{ Option, MultiValue }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
