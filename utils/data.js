const data = {
    users: [
      {
        username: "John",
        email: "John@example.com",
        thoughts: [],
        friends: [],
      },
      {
        username: "Jeff",
        email: "Jeff@example.com",
        thoughts: [],
        friends: [],
      },
      {
        username: "Bill",
        email: "Bill@example.com",
        thoughts: [],
        friends: [],
      },
    ],
    thoughts: [
      {
        thoughtText: "Sweet shoes",
        createdAt: new Date(),
        username: "John",
        reactions: [],
      },
      {
        thoughtText: "Awesome pizza",
        createdAt: new Date(),
        username: "Jeff",
        reactions: [],
      },
      {
        thoughtText: "Your car is cool",
        createdAt: new Date(),
        username: "Bill",
        reactions: [],
      },
    ],
  };
  
  module.exports = data;