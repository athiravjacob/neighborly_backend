export const generateOTP = (length: number = 6):string => {
    const digit = '01LZBCD2TM34AK5678EFQG9'
    return Array.from({ length }, () => digit[Math.floor(Math.random() * digit.length)]).join('') 
}