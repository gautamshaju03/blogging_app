export const SERVICE_URLS = {
  getPosts: {
    method: 'GET',
    url: '/posts'
  },
  getPostById: {
    method: 'GET',
    url: (id) => `/post/${id}`
  },
  createPost: {
    method: 'POST',
    url: '/create'
  },
  updatePost: {
    method: 'PATCH',
    url: (id) => `/update/${id}`
  },
  deletePost: {
    method: 'DELETE',
    url: (id) => `/delete/${id}`
  },
  userSignup: {
    method: 'POST',
    url: '/signup'
  },
  userLogin: {
    method: 'POST',
    url: '/login'
  },
  searchPost: {
    method: 'GET',
    url: (title) => `/search?title=${title}`
  },
  newComment: {
    method: 'POST',
    url: '/comment/new'
  },
  getComments: {
    method: 'GET',
    url: (id) => `/comments/${id}`
  },
};
