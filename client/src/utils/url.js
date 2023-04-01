
const setUrlSearch = val => {
	const url_path = window.location.pathname
	return `${url_path}?name=${val}`
}

const setUrlType = val => {
	const url_path = window.location.pathname
	return val ? `${url_path}?type=${val}` : `${url_path}`
}

const setUrlSort = (type, val) => {
	const url_path = window.location.pathname
	const params = new URLSearchParams(window.location.search)
	params.set('sort', type)
	params.set('order', val)

	let search = ''
	for(const [i,v] of params) search += `${i}=${v}&`
	
	return `${url_path}?${search.slice(0,-1)}`
}

const setUrlPager = p => {
	const url_path = window.location.pathname
	const params = new URLSearchParams(window.location.search)
	params.set('p', p)
	let search = ''
	for(const [i,v] of params) search += `${i}=${v}&`
	console.log(url_path)

	return `${url_path}?${search.slice(0,-1)}`
}


export {
	setUrlSearch,
	setUrlType,
	setUrlSort,
	setUrlPager
}