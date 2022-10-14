export const axiosConstantsService = (function () {
 const STATUS_ENUMS = {
  unauthorized: 401,
  tokenExpired: 403,
  success: 200,
  badRequest: 400,
  internalError: 500,
 };

 return {
  STATUS_ENUMS,
 };
})();
