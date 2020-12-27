import { hashPassword, verifyPassword } from "./authController.helper"

describe("Test Password Hashing & Validation", () => {
    test("Right Password should be valid", async () =>{
        const password = "testpassword"
        const hashedPassword: string = await hashPassword(password)

        expect(await verifyPassword(password, hashedPassword)).toBe(true)
    })

    test("Wrong password should not be valid", async () => {
        const password = "testpassword"
        const hashedPassword: string = await hashPassword(password)

        expect(await verifyPassword("testpassword1", hashedPassword)).toBe(false)
    })
})