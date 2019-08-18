import React, { Component } from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faBell,
    faSearch,
    faCog,
    faSpinner,
    faQuoteLeft,
    faSquare,
    faCheckSquare
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Note from "../../components/Note/Note";
import "./Home.css";

library.add(
    faBell,
    faSearch,
    faCog,
    faSpinner,
    faQuoteLeft,
    faSquare,
    faCheckSquare
)


export default class Home extends Component {

    loopThruNotes() {
        return [...'tolatetosayimsorry'].map(() => {
            return <Note />
        })
    }

    render() {
        return (
            <div className="home-page">
                <div className="home-container">
                    <div className="search-container">
                        <div className="search-wrap">
                            <div className="search-icon-wrap">
                                <FontAwesomeIcon
                                    icon={['fas', 'search']}
                                    fixedWidth={false}
                                    size="2x"
                                />
                            </div>
                            <input type="text" className="search-field" placeholder="Search" />
                        </div>
                        <div className="notification">
                            <FontAwesomeIcon
                                icon={['fas', 'bell']}
                                fixedWidth={false}
                                size="2x"
                            />
                        </div>
                    </div>
                    <h2 className="home-title">My Notes</h2>
                    <div className="home-notes-wrap">
                        {this.loopThruNotes()}
                    </div>
                </div>
            </div>
        )
    }
}