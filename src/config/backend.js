let urlConfig = {};

switch (process.env.REACT_APP_MODE) {
  case "PROD":
    urlConfig = {
      urlBackend: process.env.REACT_APP_URL_BACKEND_PROD,
    };
    break;
  case "DEV":
    urlConfig = {
      urlBackend: process.env.REACT_APP_URL_BACKEND_DEV,
    };
    break;
  case "LOCAL":
    urlConfig = {
      urlBackend: process.env.REACT_APP_URL_BACKEND_LOCAL,
    };
    break;
}

export default urlConfig;
