export const isAuthenticated = user => !!user;

export const isAllowed = (user, rights) =>
    rights.some(right => user.rights.includes(right));

export const hasRole = (user, roles) =>
    roles.some(role => user.roles.includes(role));

export const Roles = {
    Admin: 'ROLE_ADMIN',
    User: 'ROLE_USER'
};
