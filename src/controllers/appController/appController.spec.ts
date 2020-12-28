import { combineArrays } from "./appController.helper"

describe('Should output array strings combined', () => {
    test("Children", () => {
        expect(combineArrays([
            "Child 1",
            "Child 2"
        ])).toBe("Child 1, Child 2")
    })
})