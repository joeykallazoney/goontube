import { SHA512 } from 'crypto-js'
import CryptoJS from 'crypto-js'

export default (inputString, salt) => {
    let message = SHA512(`{${inputString}${salt}}`)
    return message.toString(CryptoJS.enc.Hex)
}
