import { getUsers } from '../../js/userUtils.js';

const totalCountContainer = document.querySelector('#total-count');
const completedOnboardingContainer = document.querySelector('#completed-onboarding-count');
const payedContainer = document.querySelector('#paid-count');

const updateInfo = () => {
	const users = getUsers();
	
	if (users.length === 0) return;
	
	const totalUsersCount = users.length;
	const completedOnboardingCount = users.filter(user => user.completedOnboarding).length;
	const payedCount = users.filter(user => user.didBuy).length;
	
	totalCountContainer.textContent = totalUsersCount.toString();
	
	completedOnboardingContainer.querySelector('.absolute').textContent = completedOnboardingCount.toString();
	completedOnboardingContainer.querySelector('.relative').textContent = (completedOnboardingCount / totalUsersCount * 100).toFixed(2).toString();
	
	payedContainer.querySelector('.absolute').textContent = payedCount.toString();
	payedContainer.querySelector('.relative').textContent = (payedCount / totalUsersCount * 100).toFixed(2).toString();
}

updateInfo();
window.addEventListener('storage', updateInfo);