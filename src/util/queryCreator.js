



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