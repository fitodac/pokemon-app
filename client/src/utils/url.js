const setUrlSearch = val => {
	const url_path = window.location.pathname

	return {
		pathname: url_path,
		search: `?name=${val}`
	}
}



const setUrlType = val => {
	const url_path = window.location.pathname
	return val ? 
	{
		pathname: url_path,
		search: `?type=${val}`
	} : 
	{ 
		pathname: url_path 
	}
}



const setUrlSort = (type, val) => {
	const url_path = window.location.pathname
	const params = new URLSearchParams(window.location.search)
	params.set('sort', type)
	params.set('order', val)

	let search = ''
	for(const [i,v] of params) search += `${i}=${v}&`
	
	return {
		pathname: url_path,
		search: search.slice(0,-1)
	}
}



const setUrlPager = p => {
	const url_path = window.location.pathname
	const params = new URLSearchParams(window.location.search)
	params.set('p', p)
	let search = ''
	for(const [i,v] of params) search += `${i}=${v}&`
	return {
		pathname: url_path,
		search: search.slice(0,-1)
	}
}


export {
	setUrlSearch,
	setUrlType,
	setUrlSort,
	setUrlPager
}