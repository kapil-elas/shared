// ── config file 2 (with validations) ─────────────────────────────────────────

import { MODULES, PERMISSIONS } from "@elas/cms/cms";
import DropdownComponent, { StateOption } from "../Dropdown/DropdownComponent";
import { isValidEmail, isValidPhone } from "@elas/helpers/validationUtils";
import { hasPermission } from "../Permissions/Permission";

export const dropdownOptions = {
  roleTypes: [] as StateOption[],
  departments: [] as StateOption[],
  directManagers: [] as StateOption[],
  primaryOffices: [] as StateOption[],
  users: [] as StateOption[],
  phoneTypeOption: [] as StateOption[],
  prefixOptions: [] as StateOption[],
  organization: [] as StateOption[],
};

export const checkboxOptions = {
  gasCardOptions: [
    { id: 1, label: "Yes", value: "Yes" },
    { id: 0, label: "No", value: "No" },
  ] as StateOption[],
  technologyOptions: [
    { id: 1, label: "Laptop", value: "Laptop" },
    { id: 2, label: "Tablet", value: "Tablet" },
    { id: 3, label: "Desktop Phone", value: "Desktop Phone" },
    { id: 4, label: "Cellphone", value: "Cellphone" },
    { id: 5, label: "Hotspot", value: "Hotspot" },
    { id: 6, label: "Salesforce", value: "Salesforce" },
  ] as StateOption[],
  inOfficeOptions: [
    { id: 1, label: "In Office", value: "Yes" },
    { id: 0, label: "Field", value: "No" },
  ] as StateOption[],
};

export interface FormChildren {
  label?: string;
  key: string;
  type: "text" | "dropdown" | "checkboxGroup" | "disabledtext" | "avatar";
  optionsKey?: keyof typeof dropdownOptions | keyof typeof checkboxOptions;
  multiline?: boolean;
  required?: boolean;
  disabled?: boolean;
  multiSelect?: boolean;
  validate?: (value: any) => boolean;
  errorMessage?: string;
  placeholder?: string;
}

export interface FormFieldDef {
  key: string;
  label: string;
  placeholder?: string;
  xsLabel: number;
  xsValue: number;
  type?: "text" | "dropdown" | "checkboxGroup" | "disabledtext" | "avatar";
  optionsKey?: keyof typeof dropdownOptions | keyof typeof checkboxOptions;
  multiline?: boolean;
  required?: boolean;
  disabled?: boolean;
  multiSelect?: boolean;
  validate?: (value: any) => boolean;
  errorMessage?: string;
  children?: FormChildren[];
}

// ── Position add/edit definitions ─────────────────────────────────────────────
export const addFormDefs: FormFieldDef[][] = [
  [
    {
      key: "positionName",
      label: "Position Name",
      xsLabel: 3,
      xsValue: 9,
      required: true,
      children: [
        {
          key: "positionName",
          type: "text",
          required: true,
          placeholder: "Enter position name",
          validate: (val: string) => /^[A-Za-z\s]+$/.test(val),
          errorMessage: "Position Name should contain only letters and spaces",
        },
      ],
    },
  ],
  [
    {
      key: "role",
      label: "Role Type",
      xsLabel: 3,
      xsValue: 9,
      required: true,
      children: [
        {
          key: "role",
          label: "Role Type",
          type: "dropdown",
          optionsKey: "roleTypes",
          required: true,
          placeholder: "Select role type",
          errorMessage: "Role type is required",
        },
      ],
    },
  ],
  [
    {
      key: "department",
      label: "Department",
      xsLabel: 3,
      xsValue: 9,
      required: true,
      children: [
        {
          key: "department",
          label: "Department",
          type: "dropdown",
          optionsKey: "departments",
          required: true,
          placeholder: "Select department",
          errorMessage: "Department is required",
        },
      ],
    },
  ],
  [
    {
      key: "parent_position",
      label: "Manager",
      xsLabel: 3,
      required: true,
      xsValue: 9,
      children: [
        {
          key: "parent_position",
          label: "Manager",
          type: "dropdown",
          optionsKey: "directManagers",
          required: true,
          placeholder: "Select manager",
          errorMessage: "Manager is required",
        },
      ],
    },
  ],
  [
    {
      key: "primaryOffice",
      label: "Primary Office",
      xsLabel: 3,
      xsValue: 9,
      required: true,
      children: [
        {
          key: "primaryOffice",
          label: "Primary Office",
          type: "dropdown",
          optionsKey: "primaryOffices",
          required: true,
          placeholder: "Select primary office",
          errorMessage: "Primary office is required",
        },
      ],
    },
  ],
  [
    {
      key: "assignToUser",
      label: "Assigned to User",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          label: "Assigned to User",
          key: "assignToUser",
          type: "dropdown",
          optionsKey: "users",
          placeholder: "Select users",
          multiSelect: true,
        },
      ],
    },
  ],
];

// ── Position properties (add/edit) definitions ───────────────────────────────
export const addPropDefs: FormFieldDef[][] = [
  [
    {
      key: "dashboardConfig",
      label: "Dashboard Config",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "dashboardConfig",
          type: "text",
          placeholder: "Enter dashboard configuration",
          validate: (val: string) => /^[A-Za-z0-9\s,.'\-]+$/.test(val),
          errorMessage: "Dashboard Config contains invalid characters",
        },
      ],
    },
  ],
  [
    {
      key: "jobDescription",
      label: "Job Description",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "jobDescription",
          type: "text",
          multiline: true,
          placeholder: "Enter job description",
          // free text, no further regex required
        },
      ],
    },
  ],
  [
    {
      key: "workingHours",
      label: "Working Hours",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "workingHours",
          type: "text",
          placeholder: "Enter working hours",
          // e.g. “9-5” or “08:00-17:00” — add any regex if you need a specific format
        },
      ],
    },
  ],
  [
    {
      key: "inOfficeDeskSetup",
      label: "In-Office Desk Setup",
      xsLabel: 3,
      xsValue: 3,
      children: [
        {
          key: "inOfficeDeskSetup",
          type: "text",
          placeholder: "Enter desk setup details",
          validate: (val: string) => /^[A-Za-z0-9\s,.'\-]+$/.test(val),
          errorMessage: "Desk Setup contains invalid characters",
        },
      ],
    },
    {
      key: "gasCard",
      label: "Gas Card?",
      xsLabel: 2,
      xsValue: 4,
      children: [
        {
          key: "gasCard",
          type: "checkboxGroup",
          optionsKey: "gasCardOptions",
          multiSelect: false,
        },
      ],
    },
  ],
  [
    {
      key: "technologyNeeded",
      label: "Technologies Needed",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "technologyNeeded",
          type: "checkboxGroup",
          optionsKey: "technologyOptions",
          multiSelect: true,
        },
      ],
    },
  ],
  [
    {
      key: "specialClauses",
      label: "Special Clauses",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "specialClauses",
          type: "text",
          multiline: true,
          placeholder: "Enter special clauses",
          // free text
        },
      ],
    },
  ],
  [
    {
      key: "continuingEducation",
      label: "Continuing Education",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "continuingEducation",
          type: "text",
          multiline: true,
          placeholder: "Enter continuing education details",
          // free text
        },
      ],
    },
  ],
];

// ── Position view definitions (no change needed to validations) ──────────────
export interface Employee {
  name: string;
  id: string;
  initials: string;
  bgColor: string;
}
export interface OrgChartConfig {
  positionName: string;
  positionNumber: string;
  role: string;
  department: string;
  primaryOffice: string;
  parent_position: string;
  jobDescription: string;
  workingHours: string;
  inOfficeDeskSetup: string;
  gasCard: boolean;
  workEmail: boolean;
  technologyNeeded: string[];
  specialClauses: string;
  continuingEducation: string;
  employees: Employee[];
}

export type FieldDef = {
  key: string;
  label: string;
  xsLabel: number;
  xsValue: number;
  isEmployees?: boolean;
};

export const headerDefs: FieldDef[][] = [
  [
    { key: "positionName", label: "Position Name", xsLabel: 3, xsValue: 3 },
    { key: "positionNumber", label: "", xsLabel: 3, xsValue: 3 },
  ],
  [{ key: "role", label: "Role", xsLabel: 3, xsValue: 9 }],
  [{ key: "department", label: "Department", xsLabel: 3, xsValue: 9 }],
  [{ key: "primaryOffice", label: "Primary Office", xsLabel: 3, xsValue: 9 }],
  [{ key: "parent_position", label: "Manager", xsLabel: 3, xsValue: 9 }],
  [
    {
      key: "employees",
      label: "Employees in This Position",
      xsLabel: 3,
      xsValue: 9,
      isEmployees: true,
    },
  ],
];

export const propDefs: FieldDef[][] = [
  [{ key: "inOfficeDeskSetup", label: "In-Office Desk Setup", xsLabel: 3, xsValue: 9 }],
  [{ key: "gasCard", label: "Gas Card?", xsLabel: 3, xsValue: 9 }],
  [{ key: "workEmail", label: "Work Email?", xsLabel: 3, xsValue: 9 }],
  [{ key: "jobDescription", label: "Job Description", xsLabel: 3, xsValue: 9 }],
  [{ key: "workingHours", label: "Working Hours", xsLabel: 3, xsValue: 9 }],
  [{ key: "technologyNeeded", label: "Technology Needed", xsLabel: 3, xsValue: 9 }],
  [{ key: "specialClauses", label: "Special Clauses", xsLabel: 3, xsValue: 9 }],
  [{ key: "continuingEducation", label: "Continuing Education", xsLabel: 3, xsValue: 9 }],
];

export const pastelColors = [
  "#FFCDD2",
  "#F8BBD0",
  "#E1BEE7",
  "#D1C4E9",
  "#C5CAE9",
  "#BBDEFB",
  "#B3E5FC",
  "#B2EBF2",
  "#B2DFDB",
  "#C8E6C9",
  "#DCEDC8",
  "#F0F4C3",
];

// ── User view definitions ─────────────────────────────────────────────────────

export const userHeaderDefs: FieldDef[][] = [
  [{ key: "roles", label: "Role", xsLabel: 3, xsValue: 9 }],
  [{ key: "positions", label: "Position / Title", xsLabel: 3, xsValue: 9 }],
  [{ key: "location", label: "Primary Office", xsLabel: 3, xsValue: 9 }],
  [{ key: "organization", label: "Department", xsLabel: 3, xsValue: 9 }],
];

export const userPropDefs: FieldDef[][] = [
  [{ key: "full_name", label: "Full Name", xsLabel: 3, xsValue: 9 }],
  [{ key: "address", label: "Address", xsLabel: 3, xsValue: 9 }],
  [{ key: "primaryEmail", label: "Email *", xsLabel: 3, xsValue: 9 }],
  [{ key: "secondaryEmail", label: "Secondary Email", xsLabel: 3, xsValue: 9 }],
  [{ key: "primaryPhone", label: "Phone *", xsLabel: 3, xsValue: 9 }],
  [{ key: "secondaryPhone", label: "Secondary Phone", xsLabel: 3, xsValue: 9 }],
  [{ key: "profile_pic", label: "Profile", xsLabel: 3, xsValue: 9 }],
  [{ key: "certAndEdu", label: "Certifications / Education", xsLabel: 3, xsValue: 9 }],
  [{ key: "hobbies", label: "Hobbies / Personal Interests", xsLabel: 3, xsValue: 9 }],
  [{ key: "accomplishments", label: "Accomplishments", xsLabel: 3, xsValue: 9 }],
  [{ key: "inOfficeOrField", label: "In Office or Field", xsLabel: 3, xsValue: 9 }],
  [{ key: "hometown", label: "Hometown", xsLabel: 3, xsValue: 9 }],
  [{ key: "college", label: "College", xsLabel: 3, xsValue: 9 }],
  [
    { key: "yearsInTrade", label: "Years in Trade", xsLabel: 3, xsValue: 3 },
    { key: "yearsOfService", label: "Years of Service", xsLabel: 3, xsValue: 3 },
  ],
];

// ── Dynamic userFormDefs based on permissions ────────────────────────────────
export const userFormDefs = (permissionsArray: string[]): FormFieldDef[][] => [
  // --- Information section ---
  [
    {
      key: "roles",
      label: "Role",
      xsLabel: 3,
      xsValue: 9,
      required: true,
      children: [
        {
          key: "roles",
          label: "Role",
          required: true,
          type: hasPermission(
            MODULES.PROFILE,
            [PERMISSIONS.PROFILE.UPDATE_OTHERS_ROLE_IN_PROFILE],
            permissionsArray
          )
            ? "dropdown"
            : "text",
          optionsKey: "roleTypes",
          disabled: false,
          multiSelect: true,
          errorMessage: "Role is required",
        },
      ],
    },
  ],
  [
    {
      key: "positions",
      label: "Position / Title",
      xsLabel: 3,
      xsValue: 9,
      required: true,
      children: [
        {
          key: "positions",
          label: "Position / Title",
          required: true,
          type: "dropdown",
          optionsKey: "directManagers",
          multiSelect: true,
          errorMessage: "Position / Title is required",
        },
      ],
    },
  ],
  [
    {
      key: "location",
      label: "Primary Office",
      xsLabel: 3,
      xsValue: 9,
      required: true,
      children: [
        {
          key: "location",
          label: "Primary Office",
          required: true,
          type: hasPermission(
            MODULES.PROFILE,
            [PERMISSIONS.PROFILE.EDIT_LOCATION_DETAILS],
            permissionsArray
          )
            ? "dropdown"
            : "text",
          optionsKey: "primaryOffices",
          multiSelect: false,
          errorMessage: "Primary Office is required",
        },
      ],
    },
    {
      key: "organization",
      label: "Department",
      xsLabel: 3,
      xsValue: 9,
      required: true,
      children: [
        {
          key: "organization",
          label: "Department",
          required: true,
          type: "dropdown",
          optionsKey: "organization",
          multiSelect: false,
          errorMessage: "Organization is required",
        },
      ],
    },
  ],
  // --- Personal Information: name row (2 cols each) ---
  [
    {
      key: "title",
      label: "Full Name",
      xsLabel: 3,
      xsValue: 9,
      required: true,
      children: [
        {
          key: "title",
          label: "",
          required: true,
          type: "dropdown",
          optionsKey: "prefixOptions",
          errorMessage: "Title is required",
        },
        {
          key: "first_name",
          type: "text",
          placeholder: "First Name",
          required: true,
          validate: (val: string) => /^[A-Za-z]+$/.test(val),
          errorMessage: "First Name should contain only letters",
        },
        {
          key: "middle_name",
          type: "text",
          placeholder: "Middle Name",
          validate: (val: string) => val === "" || /^[A-Za-z]+$/.test(val),
          errorMessage: "Middle Name should contain only letters",
        },
        {
          key: "last_name",
          type: "text",
          placeholder: "Last Name",
          required: true,
          validate: (val: string) => /^[A-Za-z]+$/.test(val),
          errorMessage: "Last Name should contain only letters",
        },
      ],
    },
  ],
  // --- Address line ---
  [
    {
      key: "address",
      label: "Address",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "address1",
          type: "text",
          placeholder: "Address Line 1",
          validate: (val: string) => /^[A-Za-z0-9\s,.'\-]+$/.test(val),
          errorMessage: "Address Line 1 contains invalid characters",
        },
        {
          key: "address2",
          type: "text",
          placeholder: "Address Line 2",
          validate: (val: string) => val === "" || /^[A-Za-z0-9\s,.'\-]+$/.test(val),
          errorMessage: "Address Line 2 contains invalid characters",
        },
      ],
    },
  ],
  // --- City/State/Zip/Country ---
  [
    {
      key: "locationDetails",
      label: "Location",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "city",
          type: "text",
          placeholder: "City",
          validate: (val: string) => /^[A-Za-z\s]+$/.test(val),
          errorMessage: "City should contain only letters",
        },
        {
          key: "state",
          type: "text",
          placeholder: "State",
          validate: (val: string) => /^[A-Za-z\s]+$/.test(val),
          errorMessage: "State should contain only letters",
        },
        {
          key: "zip",
          type: "text",
          placeholder: "Zip",
          validate: (val: string) => /^\d{5}(-\d{4})?$/.test(val),
          errorMessage: "Enter a valid Zip Code",
        },
        {
          key: "country",
          type: "text",
          placeholder: "Country",
          validate: (val: string) => /^[A-Za-z\s]+$/.test(val),
          errorMessage: "Country should contain only letters",
        },
      ],
    },
  ],
  // --- Email / Secondary Email ---
  [
    {
      key: "primaryEmail",
      label: "Email",
      xsLabel: 3,
      xsValue: 9,
      required: true,
      children: [
        {
          key: "primaryEmail",
          label: "Email",
          type: "text",
          required: true,
          placeholder: "Email Address",
          validate: isValidEmail,
          errorMessage: "Enter a valid email address",
        },
      ],
    },
  ],
  [
    {
      key: "secondaryEmail",
      label: "Secondary Email",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "secondaryEmail",
          label: "Secondary Email",
          type: "text",
          placeholder: "Secondary Email Address",
          validate: (val: string) => val === "" || isValidEmail(val),
          errorMessage: "Enter a valid email address",
        },
      ],
    },
  ],
  // --- Phone / Type / Secondary Phone / Type ---
  [
    {
      key: "primaryPhone",
      label: "Phone",
      xsLabel: 3,
      xsValue: 9,
      required: true,
      children: [
        {
          key: "primaryPhone",
          label: "Phone",
          type: "text",
          required: true,
          placeholder: "Phone Number",
          validate: isValidPhone,
          errorMessage: "Enter a valid phone number",
        },
        {
          key: "primaryPhoneType",
          label: "",
          type: "dropdown",
          optionsKey: "phoneTypeOption",
        },
      ],
    },
  ],
  [
    {
      key: "secondaryPhone",
      label: "Secondary Phone",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "secondaryPhone",
          label: "Secondary Phone",
          type: "text",
          placeholder: "Secondary Phone Number",
          validate: (val: string) => val === "" || isValidPhone(val),
          errorMessage: "Enter a valid phone number",
        },
        {
          key: "secondaryPhoneType",
          label: "",
          type: "dropdown",
          optionsKey: "phoneTypeOption",
        },
      ],
    },
  ],
];

// ── Profile form defs (unchanged beyond numeric validation) ─────────────────
export const userPropFormDefs: FormFieldDef[][] = [
  [
    {
      key: "profile_pic",
      label: "Profile Image",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "profile_pic",
          label: "Profile Image",
          type: "avatar",
        },
      ],
    },
  ],
  [
    {
      key: "certifications",
      label: "Certifications / Education",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "certifications",
          label: "Certifications / Education",
          type: "text",
          multiline: true,
          placeholder: "Certifications / Education",
        },
      ],
    },
  ],
  [
    {
      key: "hobbies",
      label: "Hobbies / Personal Interests",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "hobbies",
          label: "Hobbies / Personal Interests",
          type: "text",
          multiline: true,
          placeholder: "Hobbies / Personal Interests",
        },
      ],
    },
  ],
  [
    {
      key: "accomplishments",
      label: "Accomplishments",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "accomplishments",
          label: "Accomplishments",
          type: "text",
          multiline: true,
          placeholder: "Accomplishments",
        },
      ],
    },
  ],
  [
    {
      key: "work_location_type",
      label: "In Office or Field",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "work_location_type",
          label: "In Office or Field",
          type: "checkboxGroup",
          optionsKey: "inOfficeOptions",
          multiSelect: false,
        },
      ],
    },
  ],
  [
    {
      key: "hometown",
      label: "Hometown",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "hometown",
          label: "Hometown",
          type: "text",
          placeholder: "Hometown",
          validate: (val: string) => /^[A-Za-z\s]+$/.test(val),
          errorMessage: "Hometown should contain only letters",
        },
      ],
    },
  ],
  [
    {
      key: "college",
      label: "College",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "college",
          label: "College",
          type: "text",
          placeholder: "College",
          validate: (val: string) => /^[A-Za-z\s]+$/.test(val),
          errorMessage: "College should contain only letters",
        },
      ],
    },
  ],
  [
    {
      key: "years_in_trade",
      label: "Years in Trade",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "years_in_trade",
          label: "Years in Trade",
          type: "text",
          placeholder: "Years in Trade",
          validate: (val: string) => /^\d+$/.test(val),
          errorMessage: "Must be a whole number",
        },
      ],
    },
  ],
  [
    {
      key: "years_of_service",
      label: "Years of Service",
      xsLabel: 3,
      xsValue: 9,
      children: [
        {
          key: "years_of_service",
          label: "Years of Service",
          type: "text",
          placeholder: "Years of Service",
          validate: (val: string) => /^\d+$/.test(val),
          errorMessage: "Must be a whole number",
        },
      ],
    },
  ],
];
