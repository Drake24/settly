import ErrorData from "../lib/enums/ErrorData";

export default function formatErrorBag<T extends ErrorData | undefined>(
  errorData: T
): Array<string> | null {
  if (errorData === null || errorData === undefined) {
    return null;
  }

  let errorBag: Array<string> = [];

  const {
    data: { errors },
  } = Object(errorData);

  Object.entries(errors?.data).forEach(([key, value]: [string, any]) =>
    value.forEach((error: string) => {
      errorBag.push(error);
    })
  );

  return errorBag;
}