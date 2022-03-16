export const wrongDateFormat = 'The date has the wrong format';

export const validateString = (input: string, field: string): string => {
  if (!input && field === 'title') {
    return 'Please provide a title.';
  }

  if (!input && field === 'description') {
    return 'Please provide a description.';
  }

  return '';
};

// Validation function for dates
