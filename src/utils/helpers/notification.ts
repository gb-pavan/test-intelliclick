import { showNotification } from '@mantine/notifications';

interface IProps {
  title?: string;
  message: string;
}

export const errorToast = (data: IProps) => {
  showNotification({
    color: 'red',
    title: 'Error',
    ...data,
  });
};

export const successToast = (data: IProps) => {
  showNotification({
    color: 'green',
    ...data,
  });
};

export const warningToast = (data: IProps) => {
  showNotification({
    color: 'yellow',
    title: 'Warning',
    ...data,
  });
};
