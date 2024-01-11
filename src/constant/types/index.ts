export type TOption = {
  label: string;
  value: string;
  disabled?: boolean;
};
export type TError = Error & {
  response: {
    data: string;
  };
};
