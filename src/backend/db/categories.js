import { v4 as uuid } from 'uuid';

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

import {
  ReactJs,
  CssThree,
  Html5,
  Javascript,
  Nodedotjs,
  Mongodb,
} from '@icons-pack/react-simple-icons';

export const categories = [
  {
    _id: uuid(),
    categoryName: 'JavaScript',
    description:
      'Computer programming is the process of designing and building an executable computer program to accomplish a specific computing',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
    icon: <Javascript color='#F7DF1E' />,
  },
  {
    _id: uuid(),
    categoryName: 'HTML',
    description:
      'Front-end web development, also known as client-side development is the practice of producing HTML, CSS and JavaScript for a website or Web Application',
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg',
    icon: <Html5 color='#E34F26' />,
  },
  {
    _id: uuid(),
    categoryName: 'CSS',
    description:
      "Backend Development is also known as server-side development. It is everything that the users don't see and contains behind-the-scenes activities that occur when performing any action on a website.",
    img: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/CSS.3.svg',
    icon: <CssThree color='#1572B6' />,
  },
  {
    _id: uuid(),
    categoryName: 'ReactJS',
    description:
      "Backend Development is also known as server-side development. It is everything that the users don't see and contains behind-the-scenes activities that occur when performing any action on a website.",
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    icon: <ReactJs color='#61DAFB' />,
  },
  {
    _id: uuid(),
    categoryName: 'NodeJS',
    description:
      "Backend Development is also known as server-side development. It is everything that the users don't see and contains behind-the-scenes activities that occur when performing any action on a website.",
    img: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Font_Awesome_5_brands_node-js.svg',
    icon: <Nodedotjs color='#339933' />,
  },
  {
    _id: uuid(),
    categoryName: 'MongoDB',
    description:
      "Backend Development is also known as server-side development. It is everything that the users don't see and contains behind-the-scenes activities that occur when performing any action on a website.",
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg',
    icon: <Mongodb color='#339933' />,
  },
  {
    _id: uuid(),
    categoryName: 'All',
    description:
      "Backend Development is also known as server-side development. It is everything that the users don't see and contains behind-the-scenes activities that occur when performing any action on a website.",
    img: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/ALL_logo.svg',
    icon: <Mongodb color='#339933' />,
  },
];
