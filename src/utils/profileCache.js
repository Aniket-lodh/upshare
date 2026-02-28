const profileCache = new Map();

export const getCachedProfile = (id, fetchFn) => {
  if (!profileCache.has(id)) {
    const promise = fetchFn(id).catch((err) => {
      // Small safety cleanup: clear cache on failure so we can retry later
      profileCache.delete(id);
      throw err;
    });
    profileCache.set(id, promise);
  }

  return profileCache.get(id);
};
