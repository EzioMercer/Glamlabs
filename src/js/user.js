import { getUsers } from './userUtils.js';

/**
 * @typedef {{
 *     id: string,
 *     completedOnboarding: boolean,
 *     didBuy: boolean,
 *     index: number
 * }} UserData
 */

class User {
	#id = crypto.randomUUID();
	#completedOnboarding = false;
	#didBuy = false;
	#index = 0;
	
	/**
	 * @param {UserData} savedData
	 */
	static fromObject(savedData) {
		const user = new User(false);
		
		user.#id = savedData.id;
		user.#completedOnboarding = savedData.completedOnboarding;
		user.#didBuy = savedData.didBuy;
		user.#index = savedData.index;
		
		return user;
	}
	
	/**
	 * @param {boolean} shouldAdd
	 */
	constructor(shouldAdd = true) {
		if (!shouldAdd) return this;
		
		const users = getUsers();
		
		this.#index = users.push(this.toJSON()) - 1;
		
		localStorage.setItem('user', JSON.stringify(this));
		localStorage.setItem('users', JSON.stringify(users));
	}
	
	#update() {
		/**
		 * @type {UserData[]}
		 */
		const users = getUsers();
		
		users[this.#index] = this.toJSON();
		
		localStorage.setItem('user', JSON.stringify(this));
		localStorage.setItem('users', JSON.stringify(users));
	}
	
	/**
	 * @param {boolean} value
	 */
	set completedOnboarding(value) {
		this.#completedOnboarding = value;
		this.#update();
	}
	
	set didBuy(value) {
		this.#didBuy = value;
		this.#update();
	}
	
	toJSON() {
		return {
			id: this.#id,
			completedOnboarding: this.#completedOnboarding,
			didBuy: this.#didBuy,
			index: this.#index,
		}
	}
}

export default User;