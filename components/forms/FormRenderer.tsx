
import React, { useState } from "react";
import { Grid, TextField, Checkbox, Box, Avatar } from "@mui/material";
import { StateOption } from "@elas/shared/components/Dropdown/DropdownComponent";
import { FormChildren, FormFieldDef, checkboxOptions } from "./entityFieldDefs";
import { AsyncDropdown, SoftButton, SoftTypography } from "@elas/shared/components";
interface Section<T extends FormFieldDef> {
  title: string;
  defs: T[][];
}

export interface FormRendererProps<T extends FormFieldDef> {
  formData: Record<string, any>;
  onChange: (key: string, value: any) => void;
  sections: Section<T>[];

  // ← dropdownData passed from parent
  dropdownData: Record<
    string,
    {
      options: StateOption[];
      loadMore: () => void;
      onInputChange: (txt: string) => void;
      hasMore: boolean;
    }
  >;

  // checkboxOptions: Record<string, StateOption[]>;
  submitAction: () => void;
  submitLabel?: string;
  submitDisabled?: boolean;
}

const FormRenderer = <T extends FormFieldDef>({
  formData,
  onChange,
  sections,
  dropdownData,
  // checkboxOptions,
  submitAction,
  submitLabel,
  submitDisabled,
}: FormRendererProps<T>) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const handleBlur = (key: string) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const renderLabel = (def: FormFieldDef) => (
    <SoftTypography
      variant="subtitle2"
      color="textSecondary"
      sx={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}
    >
      {def?.label}
      {def?.required && (
        <Box component="span" sx={{ color: "error.main", ml: 0.3 }}>
          *
        </Box>
      )}
    </SoftTypography>
  );

  const renderField = (def: FormChildren) => {
    const raw = formData[def?.key];
    const val = raw == null ? (def?.type === "checkboxGroup" ? [] : "") : raw;
    const profile_pic = formData?.profile_pic;
    const isRequired = def?.required ?? false;
    const isEmpty = def?.type === "text" && !val;
    const isValid = def?.validate ? def?.validate(val) : true;
    const showError =
      Boolean((isRequired && isEmpty) || (!isEmpty && !isValid)) && touched[def?.key];
    switch (def?.type) {
    case "disabledtext":
      return (
        <TextField
          fullWidth
          placeholder={def?.placeholder}
          size="small"
          disabled={def?.disabled}
          required={isRequired}
          error={showError}
          helperText={showError ? `${def?.label} is required` : undefined}
          multiline={!!def?.multiline}
          minRows={def?.multiline ? 3 : 1}
          value={val}
          onChange={(e) => onChange(def?.key, e.target.value)}
          onBlur={() => handleBlur(def?.key)}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: 0,
              border: "none",
              paddingLeft: "0 !important",
            },
            "& .MuiInputBase-input": {
              fontSize: "0.75rem",
              lineHeight: 1.4,
              padding: "4px 4px",
              whiteSpace: def.multiline ? "pre-wrap" : "nowrap",
              overflowWrap: def.multiline ? "break-word" : "normal",
              width: "100% !important",
              height: "20px !important",
            },
          }}
        />
      );

    case "text": {
      const isNumericField = def.validate === undefined ? false : def.errorMessage === "Must be a whole number";
      return (
        <TextField
          fullWidth
          type={isNumericField ? "number" : "text"}
          inputProps={isNumericField ? { min: 0, step: 1 } : undefined}
          placeholder={def.placeholder}
          size="small"
          required={isRequired}
          disabled={def.disabled}
          helperText={showError ? def.errorMessage || `${def.label} is required` : undefined}
          error={showError}
          multiline={!!def.multiline}
          minRows={def.multiline ? 3 : 1}
          value={val}
          onChange={(e) => {
            const v = isNumericField ? e.target.value.replace(/\D/g, "") : e.target.value;
            onChange(def.key, v);
          }}
          onBlur={() => handleBlur(def.key)}
          sx={{
            "& .MuiOutlinedInput-root": { padding: 0 },
            "& .MuiInputBase-input": {
              fontSize: "0.75rem",
              lineHeight: 1.4,
              padding: "4px 4px",
              whiteSpace: def?.multiline ? "pre-wrap" : "nowrap",
              overflowWrap: def?.multiline ? "break-word" : "normal",
              width: "100% !important",
              height: "20px !important",
            },
          }}
        />
      );
    }

      case "dropdown": {
        const key = def.optionsKey!;
        const dd = dropdownData[key] || {
          options: [],
          loadMore: () => { },
          onInputChange: () => { },
          hasMore: false,
        };

        const arr = val as StateOption[];
        const disabled = def.disabled ?? false;

        return (
          <>
            <AsyncDropdown
              options={dd.options}
              loadMore={dd.loadMore}
              onInputChange={dd.onInputChange}
              hasMore={dd.hasMore}
              placeholder={`Select ${def.label}`}
              value={arr}
              onChange={(sel) => onChange(def.key, sel)}
              onBlur={() => handleBlur(def.key)}
              isMulti={def.multiSelect ?? false}
              disabled={disabled}
            />
            {showError && (
              <SoftTypography variant="caption" color="error" sx={{ ml: 1 }}>
                {def.label} is required
              </SoftTypography>
            )}
          </>
        );
      }

      case "checkboxGroup":
        // Guard the lookup with "|| []"
        return (
          <Box display="flex" flexWrap="wrap">
            {checkboxOptions[def?.optionsKey!].map((opt) => {
              const checked = (val as any[]).includes(opt.value);
              return (
                <Box
                  key={opt.value}
                  display="flex"
                  alignItems="center"
                  sx={{ mr: 2, mb: 1, mt: 1 }}
                >
                  <Checkbox
                    size="small"
                    checked={checked}
                    sx={{ width: "18px", height: "18px" }}
                    onChange={(e) => {
                      const prev = val as any[];
                      const isMulti = def.multiSelect ?? true;
                      let next: string[];
                      if (!isMulti) {
                        next = e.target.checked ? [opt.value] : [];
                      } else {
                        next = e.target.checked
                          ? [...prev, opt.value]
                          : prev.filter((v) => v !== opt.value);
                      }
                      onChange(def.key, next);
                    }}
                  />
                  <SoftTypography sx={{ fontSize: "0.75rem", ml: 0.5 }}>
                    {opt.label}
                  </SoftTypography>
                </Box>
              );
            })}
          </Box>
        );

    case "avatar":
      return (
        <Avatar
          variant="square"
          src={profile_pic?.initials || undefined}
          sx={{
            width: 60,
            height: 60,
            backgroundColor: profile_pic?.bgColor,
            fontSize: "1rem",
          }}
        >
          {profile_pic?.initials}
        </Avatar>
      );
    default:
      return null;
    }
  };

  return (
    <Box p={2} sx={{ height: "100%", overflowY: "auto" }}>
      {(sections || []).map(({ title, defs }, idx) => (
        <React.Fragment key={idx}>
          <SoftTypography variant="h6" fontWeight="bold" mb={1}>
            {title}
          </SoftTypography>
          <Grid container spacing={0.5} alignItems="center">
            {/* Guard `defs` and `row` against undefined: */}
            {(defs || []).map((row) =>
              (row || []).map((def) => (
                <React.Fragment key={def.key}>
                  <Grid item xs={def.xsLabel} sx={{ px: 1, py: 0.5 }}>
                    {renderLabel(def)}
                  </Grid>
                  <Grid
                    item
                    xs={def.xsValue}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      px: 1,
                      py: 0.5,
                    }}
                  >
                    {/* Guard `children` with `?.map`: */}
                    {def.children?.map((child) => (
                      <div
                        key={child.key}
                        style={{ margin: "0 10px", width: "100%" }}
                      >
                        {renderField(child)}
                      </div>
                    ))}
                  </Grid>
                </React.Fragment>
              ))
            )}
          </Grid>
          {idx < (sections?.length || 0) - 1 && <Box mt={2} />}
        </React.Fragment>
      ))}
      {submitLabel && (
        <SoftButton
          variant="contained"
          color="info"
          sx={{ mt: 2, display: "flex", justifySelf: "flex-end" }}
          onClick={submitAction}
          disabled={submitDisabled}
        >
          {submitLabel}
        </SoftButton>
      )}
    </Box>
  );
};

export default FormRenderer;
