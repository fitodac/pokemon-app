const success = (req, res, message, status, details) => {
	if( details ) console.log(details)

	res.status(status || 200).json({
		error: '',
		body: message
	})
}


const error = (req, res, message, status, details) => {
	console.log(details)

	res.status(status || 500).json({
		error: message,
		body: ''   
	})

}



module.exports = {
	success,
	error
}