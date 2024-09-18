import getPagesData from './src/js/getPagesData.js';
import createPages from './src/js/createPages.js';
import { createUser, initUsers } from './src/js/userUtils.js';

initUsers();
createUser();

/**
 * @type {HTMLDivElement}
 */
const pagesContainer = document.querySelector('.pages');
const pagesData = await getPagesData();

createPages(pagesContainer, pagesData);