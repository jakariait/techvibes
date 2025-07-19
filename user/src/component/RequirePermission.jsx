import React from "react";

const RequirePermission = ({
  permission,
  userPermissions = [],
  children,
  fallback = null,
  match = "all", // "all" or "any"
}) => {
  const requiredPermissions = Array.isArray(permission)
    ? permission
    : [permission];

  const hasPermission =
    Array.isArray(userPermissions) &&
    (match === "any"
      ? requiredPermissions.some((perm) => userPermissions.includes(perm))
      : requiredPermissions.every((perm) => userPermissions.includes(perm)));

  if (!hasPermission) {
    if (fallback === true) return null; // explicitly hide
    if (fallback) return <>{fallback}</>; // show fallback content
    return null; // default no render
  }

  return <>{children}</>;
};

export default RequirePermission;
