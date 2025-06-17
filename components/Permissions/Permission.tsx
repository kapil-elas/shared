import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@elas/redux';
import { PERMISSIONS } from './PermissionConfig';
import { convertPermissionsData, getAllPermissionStrings } from './PermissionSelectors';

interface PermissionProps {
  module: string;
  action: string[];
  children: ReactNode;
}

/**
 * Checks if a user has the required permission
 * @param module - The permission module (e.g., "TIMESHEET", "ORGANIZATION")
 * @param action - The specific action (e.g., "CREATE_ENTRY", "DELETE_ORGANIZATION")
 * @param permissions - Array of user permissions to check against
 * @returns boolean indicating if the user has the permission
 */
export const hasPermission = (module: string, action: string[], permissions: string[]): boolean => {
  // Check if module exists
  if(permissions.length === 0) return true;
  if (!PERMISSIONS[module]) return false;
  
  // Get the module's actions
  const moduleActions = PERMISSIONS[module];
  
  // Check if all actions exist in module and permissions
  return action.every(a => moduleActions[a] && permissions.includes(moduleActions[a]));
};

/**
 * Permission component that conditionally renders children based on user permissions
 * @param module - The permission module (e.g., "TIMESHEET", "ORGANIZATION")
 * @param action - The specific action (e.g., "CREATE_ENTRY", "DELETE_ORGANIZATION")
 * @param children - React children to render if permission is granted
 */
const Permission: React.FC<PermissionProps> = ({ module, action, children }) => {
  // Only render children if the user has all required permissions
  const {userContext} = useSelector((state: RootState) => state.user);
  const permissions = userContext && userContext?.permissions ? userContext?.permissions : [];
  const permissionObject =  convertPermissionsData(permissions);
  const permissionsArray = getAllPermissionStrings(permissionObject);
  return hasPermission(module, action, permissionsArray) ? <>{children}</> : null;
};

export default Permission;