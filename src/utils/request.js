export const baseURL = () => process.env.REACT_APP_BASE_URL;

export const url = ({ ri, ci }) => `${baseURL()}/ex/sheet/${ri}/${ci}.json`;

export const request = async (url, method='GET', data=null) => {
  const response = await fetch(url, {
    method,
    ...(data && {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  });
  const json = await response.json();
  return json;
}