import { axiosConstantsService } from './constants';

export const apiUtilService = (function () {
 const isResponseOk = (status: number) => status === axiosConstantsService.STATUS_ENUMS.success;

 const isErrorResponse = (status: number) => status !== axiosConstantsService.STATUS_ENUMS.success;

 return {
  isResponseOk,
  isErrorResponse,
 };
})();
