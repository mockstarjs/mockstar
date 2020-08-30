import superagent from 'superagent';

export function ajax(opts = {}) {
  // 当请求为POST类型时，预览结果时报错 #40
  // query 为 null 的时候，需手动换为 undefined
  const queryOpts = opts.data ? opts.data : undefined;

  if (opts.method && (opts.method.toLowerCase() === 'post')) {
    return getDataByPost(opts.url, queryOpts);
  } else {
    return getDataByGet(opts.url, queryOpts);
  }
}

export function getDataByPost(url, queryOpts) {
  return new Promise((resolve, reject) => {
    superagent
      .post(url)
      .set('Content-Type', 'application/json')
      .send(queryOpts)
      // .withCredentials()
      .end((err, res) => {
        if (err) {
          return reject(err);
        }

        resolve(res.body);
      });
  });
}

export function getDataByGet(url, queryOpts) {
  return new Promise((resolve, reject) => {
    superagent
      .get(url)
      .query(queryOpts)
      // .withCredentials()
      .end((err, res) => {
        if (err) {
          return reject(err);
        }

        resolve(res.body);
      });
  });
}
