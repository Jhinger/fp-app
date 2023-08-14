
class User {
    constructor(username, id, biography) {
        this.username = username;
        this.id = id;
        this.biography = biography;
    }
}

export default function getDefaultUsers() {
    return new User("Gurshan Jhinger", "12345", "This is my biography");
}