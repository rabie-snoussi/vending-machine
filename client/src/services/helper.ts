import { toast } from 'react-toastify';
import { AxiosResponse, AxiosPromise } from 'axios';
import get from 'lodash/get';
import locale from 'shared/locale.json';

interface Toastify {
  axiosPromise: AxiosPromise;
  successMessage: string;
}

export const toastify = ({ axiosPromise, successMessage }: Toastify) =>
  toast.promise(axiosPromise, {
    pending: locale.pendingRequest,
    success: successMessage,
    error: {
      render({ data }: AxiosResponse) {
        const serverMessage = get(data, 'response.data');
        const errorMessage = get(data, 'message');
        return serverMessage || errorMessage;
      },
    },
  });
