import { toast } from 'react-toastify';
import { clearNotification } from '../../store/notifications/notifications.slice';
import { getNotifications } from '../../store/notifications/notifications.selectors';
import { Notification } from '../../types/notifications';
import { useAppDispatch, useAppSelector } from '../../hooks';
import 'react-toastify/dist/ReactToastify.css';

function NotificationCard(): JSX.Element {
  const notifications = useAppSelector(getNotifications);
  const dispatch = useAppDispatch();

  const renderNotification = () => {
    notifications.forEach((notification: Notification) => {
      const toastOptions = {
        autoClose: notification.duration,
        toastId: notification.id,
        onClose: () => dispatch(clearNotification(notification.id)),
      };

      if (toast.isActive(notification.id)) {
        return;
      }

      switch (notification.type) {
        case 'error':
          toast.error(notification.message, toastOptions);
          break;
        case 'success':
          toast.success(notification.message, toastOptions);
          break;
        case 'info':
          toast.info(notification.message, toastOptions);
          break;
        case 'warning':
          toast.warning(notification.message, toastOptions);
          break;
        default:
          return null;
      }
    });
  };

  return (
    <>
      {renderNotification()}
    </>
  );
}

export default NotificationCard;
