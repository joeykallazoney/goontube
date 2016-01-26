// Component that allows users to search for videos and add them directly.

import React from 'react'
import ReactDOM from 'react-dom'

import { makePacket } from '../util'
import youtubeDataApi from 'youtube-node'


const KEYCODE_ENTER = 13

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

class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    onKeyDown(event) {
        let nativeEvent = event.nativeEvent

        if (KEYCODE_ENTER === nativeEvent.keyCode) {
            let searchInputValue = this.refs.searchInput.value

            try {
              console.log(youtubeDataApi)
              console.log('Hit search input try.')
              return null;
            } catch(e) {
                console.log('Video search has failed to execute.')
            }
        }
    }

    render() {
        return (
            <div className="search-input">
                <input ref="searchInput" type="text" onKeyDown={(e) => this.onKeyDown(e)} />
            </div>
        )
    }
}

class Search extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
    
    }

    render() {
        return (
            <div className="search">
                <SearchInput />
            </div>
        )
    }
}

export default Search
