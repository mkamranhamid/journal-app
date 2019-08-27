



export function loginQuery({ email, password }) {
    return `
        mutation {
            login(email:"${email}", password:"${password}"){
                firstname
                lastname
                email
                token
            }
        }
    `
}

export function registerQuery({ firstname, lastname, username, email, password }) {
    return `
        mutation {
            register(email:"${email}", password:"${password}",firstname:"${firstname}",lastname:"${lastname}",username:"${username}"){
                firstname
                lastname
                email
            }
        }
    `
}

export function checkUsernameAvailability({ username }) {
    return `
        query {
            usernameAvailability(username:"${username}"){
                availability
            }
        }
    `
}

export function getJournals() {
    return `
        query {
            journals{
                id
                body
                title
                createdAt
            }
        }
    `
}

export function addJournal({ body, title }) {
    return `
        mutation {
            journalCreate(title: "${title}", body: "${body}"){
                title
                body
                createdAt
            }
        }
    `
}

export function removeJournal({ id }) {
    return `
        mutation {
            journalDelete(id: "${id}"){
                id
                title
                body
            }
        }
    `
}

export function logoutQry() {
    return `
        mutation {
            logout{
                message
            }
        }
    `
}

export function editJournal({ id, body, title }) {
    return `
        mutation {
            journalUpdate(id: "${id}",body:"${body}",title:"${title}"){
                id
                title
                body
                createdAt
            }
        }
    `
}