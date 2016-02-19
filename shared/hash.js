import { SHA512, enc } from 'crypto-js'

export default (salt, inputString) =>
    salt => inputString =>
        SHA512(`{${inputString}${salt}}`).toString(enc.Hex)(inputString)
