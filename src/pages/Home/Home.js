import React, { Component } from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faBell,
    faSearch,
    faPlus,
    faSignOutAlt,
    faQuoteLeft,
    faSquare,
    faCheckSquare
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { getJournals, addJournal, removeJournal, logoutQry, editJournal } from "../../util/queryCreator";
import { toastSuccess, removeToken } from "../../util/common";
import { request } from "../../util/request";
import Note from "../../components/Note/Note";
import CreateJournal from "../../Modals/CreateJournal";
import EditJournal from "../../Modals/EditJournal";
import "./Home.css";

library.add(
    faBell,
    faSearch,
    faPlus,
    faSignOutAlt,
    faQuoteLeft,
    faSquare,
    faCheckSquare
)

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            journals: [],
            showModal: false,
            showEditModal: false,
            loading: true,
            edit: {}
        }
        this.fetchAllJournals();
    }

    async fetchAllJournals() {
        const queryStr = getJournals();
        const getAllJournalsequest = await request(queryStr, true);
        if (getAllJournalsequest.journals.length > 0) {
            this.setState({ journals: getAllJournalsequest.journals })
        }
        this.setState({ loading: false });
    }

    async handleOnJournalRemove({ id, index }) {
        const queryStr = removeJournal({ id: id });
        const { journalDelete } = await request(queryStr, true);
        if (journalDelete) {
            toastSuccess(`Successfully removed journal`);
            let journals = this.state.journals;
            journals.splice(index, 1);
            this.setState({ journals: journals });
        }
    }

    handleOnJournalEdit({ data, index }) {
        const editState = { data, index }
        this.setState({ showEditModal: true, edit: editState });
    }

    loopThruNotes() {
        if (this.state.loading) return <h4>Loading...</h4>
        if (this.state.journals.length == 0) return <h4>No Notes has yet been created. Start your notes</h4>
        return this.state.journals.map((d, i) => {
            return <Note
                data={{ ...d, index: i }}
                onRemove={(index) => this.handleOnJournalRemove(index)}
                onEdit={(data) => this.handleOnJournalEdit(data)}
                key={i} />
        })
    }

    handleAddJournalToggle() {
        this.setState({ showModal: !this.state.showModal });
    }

    async handleAddJournal(fields) {
        const queryStr = addJournal(fields);
        const { journalCreate } = await request(queryStr, true);
        if (journalCreate) {
            toastSuccess(`Successfully created journal`);
            let journals = this.state.journals;
            journals.push(journalCreate)
            this.setState({ journals: journals, showModal: !this.state.showModal });
        }
    }

    async handleEditJournal({ title, body, index }) {
        console.log('A B C');
        const queryStr = editJournal({ ...this.state.edit.data, title, body });
        const { journalUpdate } = await request(queryStr, true);
        if (journalUpdate) {
            toastSuccess(`Successfully editted journal`);
            let journals = this.state.journals;
            journals.splice(index, 1, journalUpdate);
            this.setState({ journals: journals, showEditModal: !this.state.showEditModal });
        }
    }

    async handleOnLogout() {
        const queryStr = logoutQry();
        const { logout } = await request(queryStr, true);
        if (logout.message) {
            removeToken();
            toastSuccess(`Successfully logged out`);
            this.props.history.replace('auth');
        }
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
                        <div className="notification cursor-pointer">
                            <FontAwesomeIcon
                                icon={['fas', 'bell']}
                                fixedWidth={false}
                                size="2x"
                            />
                        </div>
                        <div className="notification cursor-pointer" onClick={() => this.handleOnLogout()}>
                            <FontAwesomeIcon
                                icon={['fas', 'sign-out-alt']}
                                fixedWidth={false}
                                size="2x"
                            />
                        </div>
                    </div>
                    <div className="home-title-container">
                        <h2 className="home-title">My Notes</h2>
                        <div className="add-icon" onClick={(e) => this.handleAddJournalToggle(e)}>
                            <FontAwesomeIcon
                                icon={['fas', 'plus']}
                                fixedWidth={false}
                                size="2x"
                            />
                        </div>
                    </div>
                    <div className="home-notes-wrap">
                        {this.loopThruNotes()}
                    </div>
                    <CreateJournal
                        show={this.state.showModal}
                        onClose={() => this.handleAddJournalToggle()}
                        onCreate={(fields) => this.handleAddJournal(fields)} />
                    {this.state.showEditModal && <EditJournal
                        data={this.state.edit.data}
                        show={this.state.showEditModal}
                        onClose={() => this.setState({ showEditModal: !this.state.showEditModal })}
                        onSubmit={(fields) => this.handleEditJournal(fields)} />}
                </div>
            </div>
        )
    }
}