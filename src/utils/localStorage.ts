export const addItemToLocalStorage = ({
  name,
  item,
}: {
  name: string;
  item: any;
}) => {
  localStorage.setItem(name, item);
};

export const getItemFromLocalStorage = (name: string) => {
  return localStorage.getItem(name);
};

export const removeItemFromLocalStorage = (name: string) => {
  console.log("removing");
  return localStorage.clear();
};
