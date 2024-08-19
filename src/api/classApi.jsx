//to get a class using id in address bar
export const classLoader = async ({ params }) => {
  const res = await fetch(`/api/classrooms/${params.id}`);
  const data = await res.json();
  return data;
};
