import { MODULES, PERMISSIONS, ROUTES } from "@elas/cms/cms";

export interface GridItem {
  label: string;
  route: string;
  permissions: { module: string; action: string[] };
}

export interface GridColumn {
  header: string;
  items: GridItem[];
}

export const gridData: GridColumn[][] = [
  [
    {
      header: "Settings",
      items: [
        {
          label: ROUTES.DEPARTMENT.label,
          route: ROUTES.DEPARTMENT.path,
          permissions: { module: ROUTES.DEPARTMENT.module, action: ROUTES.DEPARTMENT.action },
        },
        {
          label: ROUTES.LOCATION.label,
          route: ROUTES.LOCATION.path,
          permissions: { module: ROUTES.LOCATION.module, action: ROUTES.LOCATION.action },
        },
        {
          label: ROUTES.ROLES_MANAGEMENT.label,
          route: ROUTES.ROLES_MANAGEMENT.path,
          permissions: { module: ROUTES.ROLES_MANAGEMENT.module, action: ROUTES.ROLES_MANAGEMENT.action },
        },
        {
          label: ROUTES.ORG_CHART.label,
          route: ROUTES.ORG_CHART.path,
          permissions: { module: ROUTES.ORG_CHART.module, action: ROUTES.ORG_CHART.action },
        },
      ],
    },
  ],
  // [
  // ],
];
