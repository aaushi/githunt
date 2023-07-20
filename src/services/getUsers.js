export async function getUsersApi(userName) {
  const data = await fetch("https://api.github.com/users/" + userName);
  const res = await data.json();
  return res;
}