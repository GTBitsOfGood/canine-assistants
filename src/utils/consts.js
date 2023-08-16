const pages = {
  index: "/",
  api: {
    example: "/api/example",
    users: {
      index: "/api/users",
    },
  },
};

const consts = {
  baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
};

export { pages, consts };
