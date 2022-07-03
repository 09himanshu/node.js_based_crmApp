
// Logic to transform the object
exports.userResponse = (users) => {
    let userResponse = [];
    users.forEach(user => {
        userResponse.push({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus
        });
    });
    return userResponse;
}


// transform ticket object
exports.ticketsResponse = (ticket) => {
    return {
        title: ticket.title,
        description: ticket.description,
        ticketPriority: ticket.ticketPriority,
        status: ticket.status,
        repoter: ticket.repoter,
        assignee: ticket.assignee,
        id: ticket._id,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
    }
}

exports.ticketListResponse = (tickets) => {
    ticketResult = [];
    tickets.forEach(ticket => {
        ticketResult.push({
            title: ticket.title,
            description: ticket.description,
            ticketPriority: ticket.ticketPriority,
            status: ticket.status,
            repoter: ticket.repoter,
            assignee: ticket.assignee,
            id: ticket._id,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
        })
    })
    return ticketResult;
}