const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const resolvers = {
  Query: {
    students: () => students,
  },
  Mutation: {
    addStudent: (e, { input }) => {
      console.log(input);
      students.push({
        name: input.name,
        age: input.age,
        email: input.email,
        id: input.id,
      });
      return {
        name: input.name,
        age: input.age,
        email: input.email,
        id: input.id,
      };
    },
  },
};

const typeDefs = gql`
  type Student {
    id: Int
    name: String
    email: String
    age: Int
  }

  input StdInput {
    id: Int
    name: String
    email: String
    age: Int
  }

  type Query {
    students: [Student]
  }

  type Mutation {
    addStudent(input: StdInput): Student
  }
`;

const students = [
  {
    id: 1,
    name: "Asad",
    email: "asad.arshad.94849@gmail.com",
    age: 22,
  },
  { id: 2, name: "Hamoud", email: "Hamoud@gmail.com", age: 23 },
  { id: 3, name: "Mahad", email: "Mahad@gmail.com", age: 19 },
];

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
