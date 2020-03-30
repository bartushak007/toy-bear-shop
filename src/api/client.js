export async function apiClient({ params = {}, url, method }) {
  console.log({params, url, method})
  const response = await fetch(url, {
    method: method || "get",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  if (!data.success) return  new Error();
  return data;
}
