const ffnet = require('./provider-ffnet')
const story = '12188150'

;(async () => {
	console.log(await ffnet.get(ffnet.getRequestUrl({story})))
})()
