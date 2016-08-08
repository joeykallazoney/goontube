import DailyMotion from './dailymotion'
import Vimeo from './vimeo'
import YouTube from './youtube'

const providers = [DailyMotion, Vimeo, YouTube]

export function providerForUrl(url) {
    let usingProvider = null

    providers.forEach(provider => {
            let re = new RegExp(provider.test()),
                res = null

            if(null !== (res = re.exec(url))) {
                usingProvider = {
                    provider:   provider,
                    videoId:    res[provider.idResult()]
                }
            }
        })

    return usingProvider
}

export default {
    'dailymotion':  DailyMotion,
    'vimeo':        Vimeo,
    'youtube':      YouTube
}
