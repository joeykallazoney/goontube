import { SHA512 } from 'crypto-js'
import CryptoJS from 'crypto-js'

export default (salt, inputString) =>
    (...salt) => ((inputString) =>
        SHA512(`{${inputString}${salt}}`).toString(CryptoJS.enc.Hex))()
