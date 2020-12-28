import User from "../models/User"
import { jwtSign, jwtVerify } from "./jwtHelper"
import mockUser from "../models/Mocks/User"

const testUser: User = mockUser

test("Signed User Data Should Be Unchanged", async () => {
    const jwt: string = jwtSign(testUser)  

    const userData: User = await jwtVerify(jwt)
    
    expect(userData).toEqual({...testUser, iat: userData.iat})
})