/**
 * @returns {Promise<PageData[]>}
 */
const getPagesData = () => {
	return fetch('./src/db/pagesDB.json')
		.then(res => res.json())
		.then(
			/**
			 * @param {{pagesData: PageData[]}} json
			 */
			json => json.pagesData
		)
}

export default getPagesData;