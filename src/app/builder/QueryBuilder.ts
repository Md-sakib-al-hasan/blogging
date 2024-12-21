import { FilterQuery, Query } from 'mongoose';

//queryBuilder create for search, sort and filter
class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  //search
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>
        ),
      });
    }
    return this;
  }
  //sort
  sort() {
    let sortStr;
    if (this?.query?.sortBy && this?.query?.sortOrder) {
      const sortBy = this?.query?.sortBy;
      const sortOrder = this?.query?.sortOrder;
      sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
    }

    this.modelQuery = this.modelQuery.sort(sortStr as string);

    return this;
  }
  //filter
  // filter() {
  //   const filter = this?.query?.filter;
  //   if (filter) {
  //     this.modelQuery = this.modelQuery.find({
  //     "author._id": new mongoose.Types.ObjectId(filter as string),
  //     });
  //   }

  //   return this;
  // }
}

export default QueryBuilder;
