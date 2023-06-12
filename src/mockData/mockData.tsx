import workerAvatar from "../assets/images/avatar_woman.png";

export interface IWorkers {
  id: number;
  title: string;
  users: IWorker[];
}

export interface IWorker {
  id: number;
  name: string;
  avatar: string;
}

export const workers = [
  {
    id: 1,
    title: "Операторы",
    users: [
      {
        id: 11,
        name: "Мирон Батонов",
        avatar: workerAvatar,
      },
      {
        id: 12,
        name: "Алексей Ильин",
        avatar: workerAvatar,
      },
      {
        id: 13,
        name: "Милана Константинопольская",
        avatar: workerAvatar,
      },
    ],
  },
  {
    id: 2,
    title: "Логисты",
    users: [
      {
        id: 21,
        name: "Александра Сизых",
        avatar: workerAvatar,
      },
      {
        id: 22,
        name: "Илья Алексеев",
        avatar: workerAvatar,
      },
      {
        id: 23,
        name: "Владимир Петров",
        avatar: workerAvatar,
      },
    ],
  },
  {
    id: 3,
    title: "Бухгалтеры",
    users: [
      {
        id: 31,
        name: "Полина Калинина",
        avatar: workerAvatar,
      },
      {
        id: 32,
        name: "Наталья Натальева",
        avatar: workerAvatar,
      },
      {
        id: 33,
        name: "Константин Константинопольский",
        avatar: workerAvatar,
      },
    ],
  },
];
