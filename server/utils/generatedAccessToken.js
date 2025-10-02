import jwt from 'jsonwebtoken'

const generatedAccessToken= async(userId)=>{
    const token = await jwt.sign({id:userId},
        process.env.SECTRET_KEY_ACCESS_TOKEN,{expiresIn:'5H'}
    )
    return token
}
export default generatedAccessToken