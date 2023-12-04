class Task {
    id;
    userID;
    title;
    dateStart;
    dateEnd;
    timeStart;
    timeEnd;
    status;
    description;
    constructor(userID, title, dateStart, dateEnd, timeStart, timeEnd, status, description) {
        this.userID = userID;
        this.title=title;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.status = status;
        this.description = description;
    }
}