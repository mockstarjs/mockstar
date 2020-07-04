import axios from 'axios';

export function pkgJson(name: string, version: string, registry: string) {
  return new Promise(resolve => {
    axios(`${registry}/${name}/${version}`, {method: 'GET'})
      .then(response => {
        response = response.data;
        resolve(response);
      })
      .catch(err => {
        resolve({err: err && err.message});
      });
  });
}
