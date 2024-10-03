function caesarCipher(string, shift_factor) {
    let transformed = string.split('').map((char) => {
        let ascii = char.charCodeAt(0);
        
        // handle lower and upper cases
        if (ascii >= 65 && ascii <= 90) {
            return String.fromCharCode(((ascii - 65 + shift_factor) % 26) + 65);
        } else if (ascii >= 97 && ascii <= 122) {
            return String.fromCharCode(((ascii - 97 + shift_factor) % 26) + 97);
        } else { // non alphabet letters, do nothing
            return char;
        }
    }); 
    
    return transformed.join("");
}

module.exports = {
    caesarCipher,
};