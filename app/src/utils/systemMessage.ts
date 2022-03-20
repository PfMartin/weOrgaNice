const successes = [
  'Great!',
  'Amazing!',
  'Done!',
  'You did it!',
  'Horray!',
  'Yeet!',
];

const warnings = [
  'Attention...',
  'Ups...',
  'Well...',
  'Be careful...',
  'Notice...',
];

const errors = ['Yeet!', 'Ups!', 'Something went wrong!', 'Oh no!'];

export const getSuccessHeadline = (): string => {
  const randomNumber = Math.floor(Math.random() * successes.length);
  return successes[randomNumber];
};

export const getWarningHeadline = (): string => {
  const randomNumber = Math.floor(Math.random() * warnings.length);
  return warnings[randomNumber];
};

export const getErrorHeadline = (): string => {
  const randomNumber = Math.floor(Math.random() * errors.length);
  return errors[randomNumber];
};
