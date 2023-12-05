export const getDateLabel = (value: string) => {
  try {
    const date = new Date(value);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  } catch (error) {
    return value;
  }
};

export const getDateTimeLabel = (value?: string | null) => {
  if (!value) return ' ';
  try {
    const date = new Date(value);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  } catch (error) {
    return value;
  }
};
