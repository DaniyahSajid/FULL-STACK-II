export const generateToken = (user) => {
    const payload = {
        username: user.username,
        role: user.role,
        exp: Date.now() + 60 * 60 * 1000, // 1 hour expiry
    };

    return btoa(JSON.stringify(payload));
};

export const decodeToken = (token) => {
    try {
        return JSON.parse(atob(token));
    } catch {
        return null;
    }
};

export const isTokenValid = (token) => {
    if (!token) return false;

    const decoded = decodeToken(token);

    if (!decoded) return false;

    return decoded.exp > Date.now();
};