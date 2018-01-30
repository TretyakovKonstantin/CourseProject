import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', {user: {email, password}}),
  register: (username, email, password) =>
    requests.post('/users', {user: {username, email, password}}),
  save: user =>
    requests.put('/user', {user})
};

const Tags = {
  getAll: () => requests.get('/tags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, {slug: undefined})
const Articles = {
  all: page =>
    requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/articles/${slug}`),
  favorite: slug =>
    requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/articles/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/articles/${slug}`),
  unfavorite: slug =>
    requests.del(`/articles/${slug}/favorite`),
  update: article =>
    requests.put(`/articles/${article.slug}`, {article: omitSlug(article)}),
  create: article =>
    requests.post('/articles', {article})
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, {comment}),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`)
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

// const Groups = {
//   create: group =>
//     requests.post('/groups', {groups}),
//   find: partialName =>
//     requests.get('/groups', partialName),
//   userGroups: user =>
//     requests.post('/groups', user),
// };

let groups = [
  {id: '1', name: 'My First Group'},
  {id: '2', name: 'Dumbledore\'s Army'},
  {id: '3', name: 'Death Devourers'},
  {id: '4', name: 'Клуб Веселых и Находчивых'}
];

const Groups = {
    create: group => {
      groups.push(group);
      return {group: groups[groups.length - 1]}
    },
    get: id => (groups.find(group => group.id === id)),
    userGroups: user => groups,
    find:
      partialName => groups.filter(group => group.name.includes(partialName))
  }
;

let news = [
  {
    id: '1',
    groupId: '1',
    header: "Something big happened",
    info: 'Francis Ford Coppolas legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels ' +
    'the young Vito Corleone\'s rise with his son Michael\'s spiritual fall, deepening The_Godfathers depiction of the' +
    ' dark side of the American dream. In the early 1900s, the child Vito flees his Sicilian village for America after ' +
    'the local Mafia kills his family. Vito struggles to make a living, legally or illegally, for his wife and growing ' +
    'brood in Little Italy, killing the local Black Hand Fanucci after he demands his customary cut of the tyro\'s business.' +
    ' With Fanucci gone, Vito\'s communal stature grows.'
  },
  {
    id: '2',
    groupId: '1',
    header: 'GodFather',
    info: 'Francis Ford Coppolas legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels' +
    ' the young Vito Corleone\'s rise with his son Michael\'s spiritual fall, deepening The_Godfathers depiction of the' +
    ' dark side of the American dream. In the early 1900s, the child Vito flees his Sicilian village for America after' +
    ' the local Mafia kills his family. Vito struggles to make a living, legally or illegally, for his wife and growing ' +
    'brood in Little Italy, killing the local Black Hand Fanucci after he demands his customary cut of the tyro\'s business.' +
    ' With Fanucci gone, Vito\'s communal stature grows.'
  }, {
    id: '3',
    groupId: '1',
    header: 'GodFather 2',
    info: 'After a break of more than 15 years, director Francis Ford Coppola and writer Mario Puzo returned to the ' +
    'well for this third and final story of the fictional Corleone crime family. Two decades have passed, and crime ' +
    'kingpin Michael Corleone, now divorced from his wife Kay has nearly succeeded in keeping his promise that his ' +
    'family would one day be completely legitimate.'
  },
  {
    id: '4',
    groupId: '2',
    header: 'Hello World',
    info: 'I was drunk, I was me, I was happy, I was drunk, I was me, I was happy, I was drunk, I was me, I was happy, ' +
    'I was drunk, I was me, I was happy, I was drunk, I was me, I was happy, I was drunk, I was me, I was happy, ' +
    'I was drunk, I was me, I was happy, I was drunk, I was me, I was happy, I was drunk, I was me, I was happy, ' +
    'I was drunk, I was me, I was happy, I was drunk, I was me, I was happy, I was drunk, I was me, I was happy, '
  }
];

const News = {
  create: news => {
    news.push(news);
    return {news: news[news.length - 1]}
  },
  forGroup: id => {
    return news.filter(news => news.groupId === id)
  }
};

let events = [
  {
    "id": 1,
    "title": "All Day Event",
    "start": "2018-02-02"
  },
  {
    "id": 2,
    "title": "Long Event",
    "start": "2018-02-07",
    "end": "2018-02-10"
  },
  {
    "id": 3,
    "title": "Repeating Event",
    "start": "2018-02-09T16:00:00"
  },
  {
    "id": 4,
    "title": "Repeating Event",
    "start": "2018-02-16T16:00:00"
  }
];

const Events = {
  create: event => {
    events.push(event);
    return events[events.length - 1];
  },
  forUser: user => events
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
  Groups,
  News,
  Events,
  setToken: _token => {
    token = _token;
  }
};
