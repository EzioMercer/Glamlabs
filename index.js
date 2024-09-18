import getPagesData from './src/js/getPagesData.js';
import createPages from './src/js/createPages.js';

/**
 * @type {HTMLDivElement}
 */
const pagesContainer = document.querySelector('.pages');
const pagesData = await getPagesData();

createPages(pagesContainer, pagesData);