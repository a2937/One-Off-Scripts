
/**
 * 
 * @param {string} code - The code to be transformed 
 * @param {boolean} useChai - If the code is meant to be converted to ChaiJS
 */
export function remix(code, useChai = true)
{
    let transformedCode = code; 
    if(useChai)
    {
        // convert to isTrue statement 
        const strictTrueRegex = /assert\.(strict)?Equal\((.+),true\)/ig; 
        transformedCode = transformedCode.replaceAll(strictTrueRegex,"assert.isTrue($2)")

        // convert to isFalse statement
        const strictFalseRegex = /assert\.(strict)?Equal\((.+),false\)/ig; 
        transformedCode = transformedCode.replaceAll(strictFalseRegex,"assert.isFalse($2)")
    }
    else 
    {
        // convert to strictEqual true statement 
        const strictTrueRegex = /assert\.isTrue\((.+)\)/ig; 
        transformedCode = transformedCode.replaceAll(strictTrueRegex,"assert.strictEqual($1, true)")

        const strictFalseRegex = /assert\.isFalse\((.+)\)/ig; 
        transformedCode = transformedCode.replaceAll(strictFalseRegex,"assert.strictEqual($1, false)")

    }
    return transformedCode; 
}
