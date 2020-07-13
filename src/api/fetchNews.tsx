const API = 'https://hacker-news.firebaseio.com/v0';

export function fetchNewsList(): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(`${API}/topstories.json`)
      .then((res) => resolve(res.json()))
      .catch(err => reject([]))
  })
}

export function fetchNewInfo(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(`${API}/item/${id}.json`)
      .then((res) => resolve(res.json()))
      .catch(err => reject([]))
  })
}

export function fetchComments(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(`${API}/item/${id}.json`)
      .then(res => resolve(res.json()))
      .catch(err => reject([]));
  })
}

export function fetchArray(arr: number[] = []): Promise<any> {
  const promises = arr.map(id => fetchNewInfo(id));
  return Promise.all(promises);
}
