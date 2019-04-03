const mockstar = require('../../packages/mockstar');

const mockStarQuery = new mockstar.MockStarQuery();

mockStarQuery.addOne('demo_01', 'success', false);

console.log(mockStarQuery.getQueryString())