function countMessages<T>(arr: T[], property: keyof T, value: T[keyof T]): number{
    let count = 0;
    for (const item of arr) {
      if (item[property] === value) {
        count++;
      }
    }
    return count;
  }
  export default  countMessages;