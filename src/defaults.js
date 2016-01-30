const defaultApplicationState = {
    auth: {
        user:       null,
        token:      null
    },
    banner: {
        currentBannerIndex:  0,
        possibilities:       [
            '/img/banners/5MeXvVv.jpg',
            '/img/banners/9Nj8uNd.png',
            '/img/banners/EhtdkPS.jpg',
            '/img/banners/iwg4m.png',
            '/img/banners/jeNmV9k.jpg',
            '/img/banners/QShC1ri.png',
            '/img/banners/xBYdAMC.png',
            '/img/banners/z1wLRl1.png'
        ]
    },
    layout: {
        banner:   { x: 0,   y: 0,   w: 12,  h: 2 },
        player:   { x: 0,   y: 2,   w: 5,   h: 4 },
        chat:     { x: 6,   y: 2,   w: 6,   h: 4 },
        playlist: { x: 0,   y: 6,   w: 5,   h: 4 },
        search:   { x: 0,   y: 9,   w: 5,   h: 4 },
        content:  { x: 6,   y: 6,   w: 5,   h: 4 }
    },
    room: {
        name:           null,
        motd:           null,
        playlist:       [],
        users:          [],
        history:        [],
        media: {
            active:     false,
            streams:    [],
            id:         'FTaWrcmhAgw',
            provider:   'youtube',
            position:   0
        }
    },
    search:  {
        query: '',
        results: [],
        apiKeys: {
            youtube: 'AIzaSyBQW8bHDt7RHZa5uVVRP4r0jNIUZD_39o4'
        }
    }
}

export default defaultApplicationState
