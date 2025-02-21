export const generateOTP = (length: number = 4):string => {
    const digit = '0123456789'
    return Array.from({ length }, () => digit[Math.floor(Math.random() * digit.length)]).join('') 
}