// src/components/forms/EntityForm.tsx

import React from "react";
import FormRenderer, {
  FormRendererProps,
} from "./FormRenderer";
import { FormFieldDef } from "./entityFieldDefs";
import { StateOption } from "@elas/shared/components/Dropdown/DropdownComponent";

export interface Section {
  title: string;
  defs: FormFieldDef[][];
}

export interface EntityFormProps {
  sections: Section[];
  formData: Record<string, any>;
  onChange: (key: string, value: any) => void;

  // ← NEW: pass down dropdownData from the parent
  dropdownData: FormRendererProps<any>["dropdownData"];

  checkboxOptions: Record<string, StateOption[]>;
  submitAction?: () => void;
  submitLabel?: string;
  submitDisabled?: boolean;
}

const EntityForm: React.FC<EntityFormProps> = ({
  sections,
  formData,
  onChange,
  dropdownData,
  checkboxOptions,
  submitAction,
  submitLabel,
  submitDisabled,
}) => {
  return (
    <FormRenderer
      formData={formData}
      onChange={onChange}
      sections={sections}
      dropdownData={dropdownData} 
      // checkboxOptions={checkboxOptions}
      submitAction={submitAction ?? (() => { })}
      submitLabel={submitLabel}
      submitDisabled={submitDisabled}
    />
  );
};

export default EntityForm;
