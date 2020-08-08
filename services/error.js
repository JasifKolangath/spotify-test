export function catchAxiosError(err) {
  let message = "Something happened in setting up the request that triggered an Error";

  if (err.response) {
    message = err.response.data.message;
  } else if (err.request) {
    message = "The request was made, but no response was received";
  }
  return { error: { message: err.message, status: err.response.status } };
}
