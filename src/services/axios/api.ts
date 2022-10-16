import { axiosConstantsService } from '@/services/axios';
import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

/**
 * NOTE: This service is using revealing module design pattern.
 * Revealing module pattern is a design pattern, which let you organise your javascript code in modules,
 * and gives better code structure. It gives you power to create public/private variables/methods (using closure),
 * and avoids polluting global scope (If you know how to avoid that).
 *
 * for more info visit: https://medium.com/@Rahulx1/revealing-module-pattern-tips-e3442d4e352#:~:text=Revealing%20module%20pattern%20is%20a,know%20how%20to%20avoid%20that).
 */

export const axiosApiService = (function () {
    const getServicePayload = (axiosInstance: AxiosInstance) => ({
        get: axiosInstance.get,
        post: axiosInstance.post,
        put: axiosInstance.put,
        patch: axiosInstance.patch,
        delete: axiosInstance.delete,
    });

    /**
     *
     * @core_api_service_instance
     */
    const coreInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_CORE_API_URL,
        headers: {
            'Content-type': 'application/json',
        },
    });

    // Request interceptors config
    const authStudioRequestInterceptor = (config: any) => config;
    const authStudioRequestErrorInterceptor = (error: any) => Promise.reject(error);

    coreInstance.interceptors.request.use(
        authStudioRequestInterceptor,
        authStudioRequestErrorInterceptor,
    );

    // Response interceptors config
    const authStudioResponseInterceptor = (response: { data: any }) => response.data;
    const authStudioResponseErrorInterceptor = (error: any) => {
        if (
            error &&
            error.response &&
            error.response.status === axiosConstantsService.STATUS_ENUMS.tokenExpired
        ) {
            // We can determine refresh token logic over to fetch the new token and set it in headers
        } else if (
            error &&
            error.response &&
            error.response.status === axiosConstantsService.STATUS_ENUMS.unauthorized
        ) {
            // Any logic which needs to be implemented when user is unauthorized will be handled in this block
        }

        // Display error in snackbar
        toast.error(error?.response?.data?.message);

        return Promise.reject(error?.response?.data);
    };

    coreInstance.interceptors.response.use(
        authStudioResponseInterceptor,
        authStudioResponseErrorInterceptor,
    );

    return {
        core: getServicePayload(coreInstance),
    };
})();
