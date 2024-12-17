class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
     filter() {
      const queryObj = { ...this.queryString };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((field) => delete queryObj[field]);
  
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt|in|ne|eq|regex)\b/g,
        (match) => `$${match}`
      );
  
      this.query = this.query.find(JSON.parse(queryStr));
      return this; 
    }
  
     sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
      return this;
    }
  
     paginate() {
      const page = parseInt(this.queryString.page, 10) || 1;
      const limit = parseInt(this.queryString.limit, 10) || 10;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
       return this;
    }
  }
  
  module.exports = APIFeatures;
  