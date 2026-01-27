import jwt from 'jsonwebtoken'
console.log("🔥 generatedAccessToken FILE LOADED");
console.log("ACCESS SECRET 👉", process.env.SECRET_KEY_ACCESS_TOKEN);


const generatedAccessToken= async(userId)=>{
    const token = await jwt.sign({id:userId},
        process.env.SECRET_KEY_ACCESS_TOKEN,{expiresIn:'5H'}
    )
    return token
}
export default generatedAccessToken