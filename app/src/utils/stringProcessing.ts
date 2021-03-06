const LIST_ITEM_MAX_NAME_LENGTH = 38;

const LIST_ITEM_MAX_DETAILS_LENGTH = 52;

export const cutString = (string: string, property: string): string => {
  let reducedString = string;

  switch (property) {
    case 'name':
      if (string.length >= LIST_ITEM_MAX_NAME_LENGTH) {
        reducedString = `${string.slice(0, LIST_ITEM_MAX_NAME_LENGTH)}...`;
      }
    case 'details':
      if (string.length >= LIST_ITEM_MAX_DETAILS_LENGTH) {
        reducedString = `${string.slice(0, LIST_ITEM_MAX_DETAILS_LENGTH)}...`;
      }
  }

  return reducedString;
};
