import Page from './src/js/page.js';

const pagesContainer = document.querySelector('.pages');

const removeLoader = () => {
	const loader = document.querySelector('.loader');
	
	loader.remove();
}

fetch('./src/db/pagesDB.json')
	.then(res => res.json())
	.then(
		/**
		 * @param {{pagesData: PageData[]}} json
		 */
		json => json.pagesData
	)
	.then(
		/**
		 * @param {PageData[]} pagesData
		 */
		pagesData => {
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
	)