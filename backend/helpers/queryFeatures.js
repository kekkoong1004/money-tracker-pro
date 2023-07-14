exports.queryOptions = (queryString, queryPromise) => {
  // Note: args 1 - queryString = req.query
  // Note: args 2 - queryPromise = Model.find()

  // Filtering
  // Restructure the query string obj
  let filterObj = { ...queryString };
  const stringsToDelete = ['page', 'sort', 'limit', 'fields'];
  stringsToDelete.forEach(str => delete filterObj[str]);

  //Advanced filtering
  // Convert all operators like 'gte' to '$gte'...
  filterObj = JSON.stringify(filterObj);
  filterObj = filterObj.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  filterObj = JSON.parse(filterObj);

  // Finally passing the filtering object into query promise
  // For example, queryPromise = Income.find()
  // we can use the queryPromise.find() again to pass in the filter obj
  let query = queryPromise.find(filterObj);

  // Sorting
  if (queryString.sort) {
    let sortingField = queryString.sort;
    sortingField = sortingField.split(',').join(' ');
    query.sort(sortingField);
  } else {
    query.sort({ createdAt: -1 });
  }

  // Field limiting
  if (queryString.fields) {
    let limitFields = queryString.fields.split(',').join(' ');
    // limitFields = string of 'title category amount date description'
    query.select(limitFields);
  } else {
    let limitFields = '-__v';
    query.select(limitFields);
  }

  // Pagination
  const page = queryString.page * 1 || 1;
  const limit = queryString.limit * 1 || 10;
  const skip = (page - 1) * limit;

  query.skip(skip).limit(limit);

  return query;
};
