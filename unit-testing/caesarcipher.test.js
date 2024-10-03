// install by using `npm install --save-dev jest`
// run by `npm test`
// https://jestjs.io/docs/getting-started

const { caesarCipher } = require("./practice");

describe("Caesar Cipher", () => {
    test("simple test", () => {
        expect(caesarCipher("xyz", 3)).toBe("abc");
    });

    test("case preservation test", () => {
        expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
    });

    test("punctuation test", () => {
        expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
    });

    test('works with a large shift value', () => {
        expect(caesarCipher('abc', 27)).toBe('bcd'); // 27 is equivalent to a shift of 1
        expect(caesarCipher('xyz', 52)).toBe('xyz'); // 52 is equivalent to a shift of 0
    });
});
