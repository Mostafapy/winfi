const errorFormat =  (error, addStack = false) => ({
	name: error.name,
	message: error.message,
	...(addStack ? {
		stack: error.stack.split('\n').map((ele) => ele.trim()),
	} : {})
});


module.exports = { errorFormat };
