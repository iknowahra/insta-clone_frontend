export const defaults = {
  isLoggedIn: !!localStorage.getItem('token'),
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem('token', token);
      cache.writeData({
        data: {
          isLoggedIn: !!localStorage.getItem('token'),
        },
      });
      return null;
    },
    logUserOut: () => {
      localStorage.removeItem('token');
      window.location.reload();
      return null;
    },
  },
};
