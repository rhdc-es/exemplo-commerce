export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

const USERS_KEY = 'users';
const USER_KEY = 'current_user';
const TOKEN_KEY = 'token';

export async function signUp(data: Omit<StoredUser, 'id'>) {
  const users: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  if (users.find(u => u.email === data.email)) {
    throw new Error('Email já cadastrado');
  }
  const newUser: StoredUser = { ...data, id: Date.now().toString() };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { user: newUser };
}

export async function signIn(email: string, password: string) {
  const users: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Credenciais inválidas');
  }
  const token = 'fake-token';
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
  return { user: { id: user.id, name: user.name, email: user.email }, token };
}

export function signOut() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function getCurrentUser() {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem(USER_KEY);
  if (token && user) {
    const { password, ...rest } = JSON.parse(user) as StoredUser;
    return { token, user: rest };
  }
  return null;
}
