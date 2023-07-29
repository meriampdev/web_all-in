export const isReservedKeyword = (str) => {
  return ['article', 'hot-tag', 'main-mv', 'top10'].includes(str) || str?.includes('t10')
}