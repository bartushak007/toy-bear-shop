export async function apiClient({ params = {}, url, method = 'get' }) {

  const response =
    method.toLowerCase() === "get"
      ? await fetch(url)
      : await fetch(url, {
          method: method || "get",
          body: JSON.stringify(params),
          headers: {
            "Content-Type": "application/json"
          }
        });
  const data = await response.json();
  if (!data.success) return new Error();
  return data;
}


