const getMessage = require("./getMessage");

describe("getMessage", () => {
    describe("for number 101", () => {
        it("returns 'number is greater than 100'", () => {
            expect(getMessage(101)).toEqual("number is greater than 100")
        })
        it("returns 'number is smaller than 100'", () => {
            expect(getMessage(50)).toEqual("number is smaller than 100")
        })
    })
})
