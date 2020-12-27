import User from "../models/User"
import { jwtSign, jwtVerify } from "./jwtHelper"

const testUser: User = {
    id: "fb9985e2-88e0-4dbb-b34e-d6f35ee3a4b3",
    username: "demo1",
    accountType: 0,
    firstName: "Demo",
    lastName: "One",
    email: "demo1@techne.nz",
    balance: 0,
    points: 0,
    schoolId: "test",
    mode: 0
}

test("Signed User Data Should Be Unchanged", async () => {
    const jwt: string = jwtSign(testUser)  

    const userData: User = await jwtVerify(jwt)
    
    expect(userData).toEqual({...testUser, iat: userData.iat})
})