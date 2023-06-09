
const axios = require("axios")


async function verifyUser(request, response, next) {
    let auth = request.headers.authorization
    // console.log(auth)
    if (auth !== undefined) {
        let token = auth.split(" ")[1]
        let headers = {
            Authorization: `Bearer ${token}`
        }
        let user_response = await axios.get(process.env.AUTH_DOMAIN, { headers: headers })
        request.user = user_response.data
    }
    next()
}
module.exports = verifyUser