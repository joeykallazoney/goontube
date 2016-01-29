// Component that allows users to search for videos and add them directly.

import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import p from '../protocol'

import { makePacket } from '../util'
import YoutubeDataApi from 'youtube-node'

let youtubeDataApi      = new YoutubeDataApi

const KEYCODE_ENTER     = 13
const NUMBER_OF_RESULTS = 10

/*
 * James/jskz: thinking about how we might build generic search interface with React+Redux:
 *
 * 1. As the user inputs, we pass state messages off to the Redux store.
 *    The application state can now reflect the present, desired search.
 *    (e.g., specify a new action type in protocol.js, USER_SEARCH_INPUT_UPDATE,
 *    and some new relevant key in the state object, perhaps a new object for
 *    search component state and the search results, which will begin [] empty)
 *
 * 2. Isolated logic subscribing to the Redux store/state of search query can
 *    begin dispatching queries to YouTube.  It notes the change in desired search,
 *    and the application state should also feature a key indicating whether or not
 *    data is currently being fetched.  This "controller" may throttle its
 *    request, debounce, but will otherwise just be responsible for making requests
 *    and 'informing' the app store about those requests.
 *
 * 3. Requests which return and match the current application state's desired
 *    search query can now be dispatched into the Redux store with appropriate
 *    actions.
 *
 * 4. We can now subscribe to the application store to receive our search results
 *    wherever, throughout the app.
 *
 * Take a look at the syntax in the banner.js component, which I have now revised
 * to take a bit more advantage of the react-redux binding library.  We can make
 * very clean components like this!

 */

function mapStateToProps(state) {
    let searchQuery = state.getIn(['search', 'query']),
        youtubeApiKey = state.getIn(['search', 'apiKeys', 'youtube'])

    return {
        youtubeApiKey: youtubeApiKey,
        value: searchQuery
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        onChange: (event) => dispatch(asyncSearchAction(event.target.value))
    }
}

function asyncSearchAction(value) {
    /*
     * Some kind of throttle/debounce?
     * ...
     */

    youtubeDataApi.search(value, NUMBER_OF_RESULTS, (err, res) => {
        if(err) {
            console.log(`Failed to fetch YouTube results.`)

            return {
                type: p.SEARCH_FAILED_YOUTUBE_SEARCH,
                data: err
            }
        } else {
            console.log(res)

            try {
                let receivedYoutubeResults = {
                    type: p.SEARCH_RECEIVED_YOUTUBE_RESULTS,
                    data: res.items.map(item => {
                        return {
                            id:             item.id.videoId,
                            title:          item.snippet.title,
                            description:    item.snippet.description,
                            thumbnail:      item.snippet.thumbnails.default.url
                        }
                    })
                }

                return receivedYoutubeResults
            } catch(e) {
                return {
                    type: p.SEARCH_FAILED_YOUTUBE_SEARCH,
                    data: e.toString()
                }
            }
        }
    })
}

function searchInputChanged(value) {
    return {
        type: p.SEARCH_NEW_SEARCH,
        value: value
    }
}

class SearchInput extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        youtubeDataApi.setKey(this.props.youtubeApiKey)
    }

    render() {
        return (
            <div className="search-input">
                <input {...this.props} ref="searchInput" type="text" />
            </div>
        )
    }
}

class Search extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="search">
                <SearchInput />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
