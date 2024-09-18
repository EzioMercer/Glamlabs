import User from './user.js';

export const initUsers = () => {
	localStorage.setItem('users', localStorage.getItem('users') ?? '[]');
}

/**
 * @returns {UserData[]}
 */
export const getUsers = () => {
	return JSON.parse(localStorage.getItem('users')) ?? [];
}

export const createUser = () => new User();

/**
 * @returns {User}
 */
export const getUser = () => {
	return User.fromObject(JSON.parse(localStorage.getItem('user')));
}