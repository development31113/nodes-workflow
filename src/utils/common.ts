export const waiter = (miliseconds?: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), miliseconds);
  });
};
