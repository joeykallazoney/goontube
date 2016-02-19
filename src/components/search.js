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

function mapStateToProps(state) {
    let searchQuery = state.search.query,
        searchResults = state.search.results,
        youtubeApiKey = state.search.youtubeApiKey

    return {
        youtubeApiKey:  youtubeApiKey,
        value:          searchQuery,
        searchResults:  searchResults
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        input: {
            onChange: (ev) => dispatch(searchInputChanged(ev.target.value))
        }
    }
}

function searchInputChanged(value) {
    return dispatch => {
        dispatch({ type: p.SEARCH_NEW_SEARCH, value: value })

        youtubeDataApi.search(value, NUMBER_OF_RESULTS, (err, res) => {
            if(err) {
                console.log(`Failed to fetch YouTube results.`)

                return {
                    type: p.SEARCH_FAILED_YOUTUBE_SEARCH,
                    data: err
                }
            } else {
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

                    dispatch(receivedYoutubeResults)
                } catch(e) {
                    console.log(`Failed to organize YouTube results.`)

                    dispatch({
                        type: p.SEARCH_FAILED_YOUTUBE_SEARCH,
                        data: e.toString()
                    })
                }
            }
        })
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
                <input onChange={(ev) => this.props.input.onChange(ev)} ref="searchInput" type="text" />
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
