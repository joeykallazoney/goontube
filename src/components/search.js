// Component that allows users to search for videos and add them directly.

import React from 'react'
import ReactDOM from 'react-dom'

import { makePacket } from '../util'
import youtubeDataApi from 'youtube-node'

//this.context.store.getState().getIn(['banner', 'possibilities'])

const KEYCODE_ENTER = 13

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
