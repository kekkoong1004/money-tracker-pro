const fetcher = async (url, headers) => {
  const response = await fetch(url, { headers });
  if (response.status === 401) {
    window.location.href = '/auth';
  }
  const data = await response.json();
  return data;
};

export default fetcher;
