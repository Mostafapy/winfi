/**
 * // Service to excute queries of select in database
 * @param { Mysql2Pool } dbPoolPromise
 * @param { String } queryStr
 * @param { Array } queryArgs
 * @returns { Promise<Array> | Error }
 */
const searchInDB = async (dbPoolPromise, queryStr, queryArgs) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const [rows, fields] = await dbPoolPromise.query(queryStr, queryArgs);

    return Promise.resolve(rows);
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = { searchInDB };
