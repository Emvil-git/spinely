import jwt from "jsonwebtoken";
const secret = "SpinelyBE";

export const createAccessToken = (user) => {
    const data = {
        userId: user.userId,
        name:user.name,
        username:user.username
    }

    return jwt.sign(data, secret, {});
}

export const verify = (request, response, next) => {
	let token = request.headers.authorization
	if(typeof token !== "undefined"){
		console.log(token);

		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (error, data) =>{
			if(error){
				return response.send({
					auth: "Failed. "
				});
			}
			else{
				next();
			}
		})
	}
}

export const decode = (token) => {
	if(typeof token !== "undefined"){

		token = token.slice(7, token.length);
	}

	return jwt.verify(token, secret, (error, data) => {
		if(error){
			return null
		}
		else{
			return jwt.decode(token, {complete:true}).payload
		}
	})
}
