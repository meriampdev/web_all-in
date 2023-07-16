export const getWindowWidth = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth
  }

  return 0
}


export const isMobile = () => {
  const windowWidth = getWindowWidth()
  return windowWidth <= 500
}