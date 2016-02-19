// Component that allows users to search for videos and add them directly.

import React from 'react'
import ReactDOM from 'react-dom'
import { Panel, PanelGroup, Button, ButtonToolbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import p from '../protocol'

import { makePacket } from '../util'
import YoutubeDataApi from 'youtube-node'

let youtubeDataApi      = new YoutubeDataApi

const KEYCODE_ENTER     = 13
const NUMBER_OF_RESULTS = 10

function mapStateToProps(state) {
    return {
        desired:        state.search.desired,
        youtubeApiKey:  state.search.youtubeApiKey,
        value:          state.search.query,
        searchResults:  state.search.results
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        result: {
            addSearchResult: (ev, id) => props.socket.send(makePacket(p.REQUEST_ADD_YOUTUBE_VIDEO, id))
        },

        input: {
            onChange: (ev) => dispatch(searchInputChanged(ev.target.value))
        }
    }
}

function searchInputChanged(value) {
    return dispatch => {
        if('' === value) {
            dispatch({ type: p.SEARCH_RESET })
            return
        }

        dispatch({ type: p.SEARCH_NEW_SEARCH, value: value })

        youtubeDataApi.search(value, NUMBER_OF_RESULTS, (err, res) => {
            if(err) {
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

class Search extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        youtubeDataApi.setKey(this.props.youtubeApiKey)
    }

    render() {
        return (
            <div className="search">
                <div className="search-input">
                    <input onChange={(ev) => this.props.input.onChange(ev)} ref="searchInput" type="text" />
                </div>

                <div>
                    {this.props.desired === false ? (
                            <div className="search-none"></div>
                        ) : <div className="search-results">
                            {this.props.searchResults.map(result =>
                                <div key={result.id}>
                                <ButtonToolbar className="result">
                                    <Button onClick={(ev) => this.props.result.addSearchResult(ev, result.id)}>
                                        Add {result.title} to playlist
                                    </Button>

                                    <a target="_blank" href={`https://youtu.be/${result.id}`}>
                                        <Button>
                                            Visit on YouTube
                                        </Button>
                                    </a>
                                </ButtonToolbar>
                                </div>
                        )}
                        </div>}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
