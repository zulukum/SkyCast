const STORAGE_KEY = 'skycastUsers';

const getStoredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

const findUserByEmail = (email) => {
  return getStoredUsers().find((user) => user.email.toLowerCase() === email.toLowerCase());
};

export const registerUser = ({ name, email, password }) => {
  if (!name.trim() || !email.trim() || !password.trim()) {
    return { success: false, message: 'Please fill in all fields.' };
  }

  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return { success: false, message: 'Email already registered. Please login.' };
  }

  const users = getStoredUsers();
  const newUser = { name: name.trim(), email: email.trim().toLowerCase(), password };
  users.push(newUser);
  saveUsers(users);

  return { success: true, user: newUser };
};

export const loginUser = ({ email, password }) => {
  if (!email.trim() || !password.trim()) {
    return { success: false, message: 'Please enter email and password.' };
  }

  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    return { success: false, message: 'Invalid email or password.' };
  }

  return { success: true, user };
};

export const resetPassword = ({ email, password }) => {
  if (!email.trim() || !password.trim()) {
    return { success: false, message: 'Please provide both email and new password.' };
  }

  const users = getStoredUsers();
  const userIndex = users.findIndex((user) => user.email.toLowerCase() === email.toLowerCase());
  if (userIndex === -1) {
    return { success: false, message: 'Email not found. Please register first.' };
  }

  users[userIndex].password = password;
  saveUsers(users);

  return { success: true, message: 'Password reset successfully. Please login with your new password.' };
};

export const getAuthUser = () => {
  try {
    return JSON.parse(localStorage.getItem('skycastAuthUser')) || null;
  } catch (error) {
    return null;
  }
};

export const setAuthUser = (user) => {
  localStorage.setItem('skycastAuthUser', JSON.stringify(user));
};

export const clearAuthUser = () => {
  localStorage.removeItem('skycastAuthUser');
};
