/**
 * Interface for the raw permission data structure
 */
interface RawPermissionModule {
  module_name: string;
  documents: {
    [key: string]: string[];
  };
}

/**
 * Converts raw permission data to a flattened format
 * @param permissionData - Array of permission modules with nested documents
 * @returns Flattened permissions object
 */
export const convertPermissionsData = (permissionData: RawPermissionModule[]): { [key: string]: { [key: string]: string } } => {
  const result: { [key: string]: { [key: string]: string } } = {};
  
  permissionData.forEach(module => {
    Object.entries(module.documents).forEach(([documentKey, actions]) => {
      result[documentKey] = result[documentKey] || {};
      
      actions.forEach(action => {
        result[documentKey][action] = action;
      });
    });
  });
  
  return result;
};

/**
 * Extracts all permission strings from the flattened permissions object
 * @param permissions - Flattened permissions object
 * @returns Array of all permission strings
 */
export const getAllPermissionStrings = (permissions: { [key: string]: { [key: string]: string } }): string[] => {
  const result: string[] = [];
  
  Object.values(permissions).forEach(modulePermissions => {
    Object.values(modulePermissions).forEach(permission => {
      result.push(permission);
    });
  });
  
  return result;
};

/**
 * Groups permissions by module name
 * @param permissionData - Array of permission modules with nested documents
 * @returns Object with module names as keys and arrays of permission strings as values
 */
export const getPermissionsByModule = (permissionData: RawPermissionModule[]): { [key: string]: string[] } => {
  const result: { [key: string]: string[] } = {};
  
  permissionData.forEach(module => {
    result[module.module_name] = [];
    
    Object.values(module.documents).forEach(actions => {
      result[module.module_name] = [...result[module.module_name], ...actions];
    });
  });
  
  return result;
};

/**
 * Checks if a user has any permissions for a specific module
 * @param moduleName - The module name to check
 * @param userPermissions - Array of user permissions
 * @param permissionData - Raw permission data
 * @returns boolean indicating if the user has any permissions for the module
 */
export const hasModuleAccess = (
  moduleName: string, 
  userPermissions: string[], 
  permissionData: RawPermissionModule[]
): boolean => {
  const modulePermissions = getPermissionsByModule(permissionData)[moduleName] || [];
  return modulePermissions.some(permission => userPermissions.includes(permission));
};