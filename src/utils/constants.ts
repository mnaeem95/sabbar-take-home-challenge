export const SERVICE_NAMES = {
  CURRENT_SERVICE: 'sabbar',
};

export const ROUTES = {
  GET_ALL: `/${SERVICE_NAMES.CURRENT_SERVICE}/customers`,
  CREATE: `/${SERVICE_NAMES.CURRENT_SERVICE}/customers/create`,
  UPDATE: `/${SERVICE_NAMES.CURRENT_SERVICE}/customers/update`,
  DELETE: `/${SERVICE_NAMES.CURRENT_SERVICE}/customers/delete`,
};
