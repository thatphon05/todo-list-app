const PROFILE_KEY = 'userProfile'

const getUserProfile = () => {
  return localStorage.getItem(PROFILE_KEY)
}

const setUserProfile = (userProfile) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(userProfile));
}

const removeUserProfile = () => {
  localStorage.removeItem(PROFILE_KEY);
}

export { PROFILE_KEY, getUserProfile, setUserProfile, removeUserProfile }