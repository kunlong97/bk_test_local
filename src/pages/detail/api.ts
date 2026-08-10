const api = {
  getBook: (id: string) => `/book?bookId=${id}`,
  getChapterInfo: '/chapterInfo',
};

export default api;
