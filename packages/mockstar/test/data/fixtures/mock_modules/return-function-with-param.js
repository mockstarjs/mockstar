module.exports = (params, req) => {
  return {
    name: 'return-function-with-param',
    desc: 'a=' + params + ',b=' + req,
    age: 16,
  };
};
