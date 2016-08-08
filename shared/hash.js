import { SHA512, enc } from 'crypto-js'

export default salt => inputString =>
    SHA512(`${salt + inputString}`).toString(enc.Hex)
