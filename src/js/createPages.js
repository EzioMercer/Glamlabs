import Page from './page.js';
import { getUser } from './userUtils.js';

const removeLoader = () => {
	const loader = document.querySelector('.loader');
	
	loader.remove();
}

/**
 * @param {HTMLDivElement} pagesContainer
 * @param {PageData[]} pagesData
 */
const createPages = (pagesContainer, pagesData) => {
	const fragment = document.createDocumentFragment();
	const step = 100 / pagesData.length;
	let preloadedPostersCount = 0;
	const img = new Image();
	const user = getUser();
	
	/**
	 * @param {number} i
	 */
	const loadNext = i => {
		if (i === pagesData.length - 1) {
			user.completedOnboarding = true;
		}
		
		pagesContainer.style.transform = `translateX(-${step * i}%)`;
	}
	const buy = () => {
		user.didBuy = true;
		
		alert('Successfully buying');
	}
	
	pagesData.forEach((pageData, i) => {
		const isLast = i === pagesData.length - 1;
		
		const page = new Page(
			pageData,
			isLast,
			isLast ? buy : () => loadNext(i + 1)
		);
		
		fragment.append(page.element);
		
		img.src = pageData.posterUrl;
		img.addEventListener('load', () => {
			if (++preloadedPostersCount === pagesData.length) removeLoader();
		})
	});
	
	pagesContainer.appendChild(fragment);
}

export default createPages;