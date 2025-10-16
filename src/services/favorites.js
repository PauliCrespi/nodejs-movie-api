const { load, save } = require("./store");

async function getBucket(userId) {
  const all = await load("favorites");
  let bucket = all.find(b => b.userId === userId);
  if (!bucket) {
    bucket = { userId, items: [] };
    all.push(bucket);
    await save("favorites", all);
  }
  return { all, bucket };
}

async function listFavorites(userId) {
  const { bucket } = await getBucket(userId);
  return bucket.items;
}

async function addFavorite(userId, item) {
  const { all, bucket } = await getBucket(userId);
  const exists = bucket.items.some(x => String(x.movieId) === String(item.movieId));
  if (exists) return { added: false, items: bucket.items };
  bucket.items.push(item);
  await save("favorites", all);
  return { added: true, items: bucket.items };
}

async function removeFavorite(userId, movieId) {
  const { all, bucket } = await getBucket(userId);
  const before = bucket.items.length;
  bucket.items = bucket.items.filter(x => String(x.movieId) !== String(movieId));
  const changed = bucket.items.length !== before;
  await save("favorites", all);
  return { removed: changed, items: bucket.items };
}

module.exports = { listFavorites, addFavorite, removeFavorite };

