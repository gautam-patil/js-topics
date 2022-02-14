class APIfeatures {
  constructor(query, queryString) {
    console.log("demo1");
    this.query = query;
    this.query = query;
    console.log("demo");
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };    
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log("sort by");
    //1 b.Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log("sort by new");
    //console.log(JSON.parse(queryStr));
    this.query = this.query.find(JSON.parse(queryStr));
    
    return this;
  }
  sort() {
    console.log("sort by new1");
    if (this.queryString.sort) {
      console.log("sort by new12");
      const sortBy = this.queryString.sort.split(",").join(" ");
      //console.log(sortBy);      
      this.query = this.query.sort(sortBy);
    } else {
      console.log("sort by new13");
      this.query = this.query.sort("-createdAt");
    }
    console.log("sort by new14");
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;

    const skipval = limit * (page - 1);
    this.query = this.query.skip(skipval).limit(limit);

    return this;
  }
}

module.exports = APIfeatures;
