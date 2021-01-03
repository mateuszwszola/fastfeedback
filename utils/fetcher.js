export default async (...args) => {
  const response = await fetch(...args);

  return response.json();
};
