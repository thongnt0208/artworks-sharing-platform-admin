import { countries } from 'src/assets/data';

import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const USER_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'banned', label: 'Banned' },
  { value: 'rejected', label: 'Rejected' },
];

export const _userAbout = {
  id: _mock.id(1),
  role: _mock.role(1),
  email: _mock.email(1),
  country: countries[1].label,
  school: _mock.companyName(2),
  company: _mock.companyName(1),
  coverUrl: _mock.image.cover(3),
  totalFollowers: _mock.number.nativeL(1),
  totalFollowing: _mock.number.nativeL(2),
  quote:
    'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
  socialLinks: {
    facebook: `https://www.facebook.com/caitlyn.kerluke`,
    instagram: `https://www.instagram.com/caitlyn.kerluke`,
    linkedin: `https://www.linkedin.com/in/caitlyn.kerluke`,
    twitter: `https://www.twitter.com/caitlyn.kerluke`,
  },
};

export const _userFollowers = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  country: countries[index + 1].label,
  avatarUrl: _mock.image.avatar(index),
}));

export const _userFriends = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  role: _mock.role(index),
  name: _mock.fullName(index),
  avatarUrl: _mock.image.avatar(index),
}));

export const _userGallery = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  postedAt: _mock.time(index),
  title: _mock.postTitle(index),
  imageUrl: _mock.image.cover(index),
}));

export const _userFeeds = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  createdAt: _mock.time(index),
  media: _mock.image.travel(index + 1),
  message: _mock.sentence(index),
  personLikes: [...Array(20)].map((__, personIndex) => ({
    name: _mock.fullName(personIndex),
    avatarUrl: _mock.image.avatar(personIndex + 2),
  })),
  comments: (index === 2 && []) || [
    {
      id: _mock.id(7),
      author: {
        id: _mock.id(8),
        avatarUrl: _mock.image.avatar(index + 5),
        name: _mock.fullName(index + 5),
      },
      createdAt: _mock.time(2),
      message: 'Praesent venenatis metus at',
    },
    {
      id: _mock.id(9),
      author: {
        id: _mock.id(10),
        avatarUrl: _mock.image.avatar(index + 6),
        name: _mock.fullName(index + 6),
      },
      createdAt: _mock.time(3),
      message:
        'Etiam rhoncus. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus.',
    },
  ],
}));

export const _userCards = [...Array(21)].map((_, index) => ({
  id: _mock.id(index),
  role: _mock.role(index),
  name: _mock.fullName(index),
  coverUrl: _mock.image.cover(index),
  avatarUrl: _mock.image.avatar(index),
  totalFollowers: _mock.number.nativeL(index),
  totalPosts: _mock.number.nativeL(index + 2),
  totalFollowing: _mock.number.nativeL(index + 1),
}));

export const _userPayment = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  cardNumber: ['**** **** **** 1234', '**** **** **** 5678', '**** **** **** 7878'][index],
  cardType: ['mastercard', 'visa', 'visa'][index],
  primary: index === 1,
}));

export const _userAddressBook = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  primary: index === 0,
  name: _mock.fullName(index),
  phoneNumber: _mock.phoneNumber(index),
  fullAddress: _mock.fullAddress(index),
  addressType: (index === 0 && 'Home') || 'Office',
}));

export const _userInvoices = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  invoiceNumber: `INV-199${index}`,
  createdAt: _mock.time(index),
  price: _mock.number.price(index),
}));

export const _userPlans = [
  {
    subscription: 'basic',
    price: 0,
    primary: false,
  },
  {
    subscription: 'starter',
    price: 4.99,
    primary: true,
  },
  {
    subscription: 'premium',
    price: 9.99,
    primary: false,
  },
];

export const _userList = [
  {
    id: '7d580000-c214-88a4-7ad3-08dc1445b3e2',
    username: 'phuhuynh',
    email: 'phu@example.com',
    fullname: 'Huỳnh Vạn Phú',
    bio: null,
    role: 'CommonUser',
    createdBy: null,
    createdOn: '2023-10-30T10:21:47.89',
    lastModificatedBy: null,
    lastModificatedOn: '2024-02-25T08:57:58.4966667',
    deletedBy: null,
    deletedOn: null,
  },
  {
    id: '7d580000-c214-88a4-0f12-08dc1445b3e2',
    username: 'thong',
    email: 'thong@example.com',
    fullname: 'Nguyễn Trung Thông',
    bio: null,
    role: 'CommonUser',
    createdBy: null,
    createdOn: '2023-10-27T19:23:47.89',
    lastModificatedBy: null,
    lastModificatedOn: '2024-02-25T08:57:58.4966667',
    deletedBy: null,
    deletedOn: null,
  },
  {
    id: '7d580000-c214-88a4-a3f1-08dc1445b3e1',
    username: 'hoanganh',
    email: 'hoanganh@example.com',
    fullname: 'Đặng Hoàng Anh',
    bio: null,
    role: 'CommonUser',
    createdBy: null,
    createdOn: '2023-10-21T19:20:47.89',
    lastModificatedBy: null,
    lastModificatedOn: '2024-02-25T08:57:58.4966667',
    deletedBy: null,
    deletedOn: null,
  },
  {
    id: '7d580000-c214-88a4-3886-08dc1445b3e1',
    username: 'lamlam',
    email: 'lamlam@example.com',
    fullname: 'Trúc Lam Võ',
    bio: null,
    role: 'CommonUser',
    createdBy: null,
    createdOn: '2023-10-15T17:15:47.89',
    lastModificatedBy: null,
    lastModificatedOn: '2024-02-25T08:57:58.4966667',
    deletedBy: null,
    deletedOn: null,
  },
  {
    id: '7d580000-c214-88a4-cc1d-08dc1445b3e0',
    username: 'user',
    email: 'user@example.com',
    fullname: 'Người dùng mặc định',
    bio: null,
    role: 'CommonUser',
    createdBy: null,
    createdOn: '2023-10-14T12:37:42.345',
    lastModificatedBy: null,
    lastModificatedOn: '2024-02-25T08:57:58.4966667',
    deletedBy: null,
    deletedOn: null,
  },
  {
    id: '7d580000-c214-88a4-e5f6-08dc1445b3e2',
    username: 'mod',
    email: 'mod@example.com',
    fullname: 'Kiểm soát viên',
    bio: null,
    role: 'Moderator',
    createdBy: null,
    createdOn: '2023-10-14T12:37:42.345',
    lastModificatedBy: null,
    lastModificatedOn: '2024-02-25T08:57:58.4966667',
    deletedBy: null,
    deletedOn: null,
  },
  {
    id: '7d580000-c214-88a4-5141-08dc1445b3e3',
    username: 'admin',
    email: 'admin@example.com',
    fullname: 'Quản trị viên hệ thống',
    bio: null,
    role: 'Admin',
    createdBy: null,
    createdOn: '2023-10-02T10:21:47.89',
    lastModificatedBy: null,
    lastModificatedOn: '2024-02-25T08:57:58.4966667',
    deletedBy: null,
    deletedOn: null,
  },
];
