const { searchService } = require("../search/search.service");
const catchAsync = require("../utils/catchAsync");

const query = catchAsync(async (req, res) => {
  const searchResults = await searchService.query(req.query.q);
  res.send(searchResults);
});

module.exports = { query };
