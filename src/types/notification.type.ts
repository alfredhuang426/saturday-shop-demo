export type Notification = {
  success?: boolean;
  id: string;
  type: string;
  title: string;
  text: string;
};

export type NotificationInitialState = {
  message: Notification[];
};
