export const generateOTP = (length: number = 6):string => {
    const digit = '01LZ2TM34AK5678QG9'
    return Array.from({ length }, () => digit[Math.floor(Math.random() * digit.length)]).join('') 
}