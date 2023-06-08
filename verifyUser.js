
const axios = require("axios")


async function verifyUser(request, response, next) {
    let auth = request.headers.authorization
    // console.log(auth)
    if (auth !== undefined) {
        let token = auth.split(" ")[1]
        let headers = {
            Authorization: `Bearer ${token}`
        }
        try {let response = await axios.get(process.env.AUTH_DOMAIN, { headers: headers })} catch{(error) => {response.send(error)}}
        request.user = response.data
        console.log(request.user)
    }
    next()
}
module.exports = verifyUser