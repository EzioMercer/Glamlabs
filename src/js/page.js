/**
 * @typedef {{
 *     videoUrl: string,
 *     posterUrl: string,
 *     title: string
 * }} PageData
 */

class Page {
	/**
	 * @type {HTMLDivElement}
	 */
	#element = null;
	
	/**
	 * @param {PageData} pageData
	 * @param {boolean} isLast
	 * @param {Function} onClick
	 */
	constructor(pageData, isLast, onClick) {
		this.#element = document.createElement("div");
		this.#element.classList.add("page");
		
		const content = document.createElement("div");
		content.classList.add("content");
		
		const title = document.createElement("p");
		title.classList.add("title");
		title.textContent = pageData.title;
		
		const video = document.createElement("video");
		video.classList.add("video");
		video.muted = true;
		video.autoplay = true;
		video.loop = true;
		video.src = pageData.videoUrl;
		video.poster = pageData.posterUrl;
		
		const button = document.createElement("button");
		
		if (isLast) {
			button.classList.add("buy");
			button.textContent = 'Buy';
		} else {
			button.classList.add("next");
			button.textContent = 'Next';
		}
		
		button.addEventListener('click', onClick);
		
		content.append(title, video, button);
		this.element.appendChild(content);
	}
	
	/**
	 * @returns {HTMLDivElement}
	 */
	get element() {
		return this.#element;
	}
}

export default Page;