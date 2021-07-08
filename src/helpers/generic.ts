export const isJsonString = (jsonString: string): boolean => {
  try {
    const item = JSON.parse(jsonString);

    return typeof item === 'object' && item !== null;
  } catch (e) {
    return false;
  }
}

export const preventTabClose = async (event: BeforeUnloadEvent) => {
  event.preventDefault();
  // eslint-disable-next-line no-return-assign,no-param-reassign
  return event.returnValue = '';
}
