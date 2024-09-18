import Page from './page.js';

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
	
	/**
	 * @param {number} i
	 */
	const loadNext = i => pagesContainer.style.transform = `translateX(-${step * i}%)`
	const buy = () => alert('Successfully buying');
	
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