import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import { Email } from "./components/auth/Email";
import { Profile } from "./components/users/user/Profile";
import { Users } from "./components/users/Users";
import {Courses} from "./components/courses/Courses";
import {InputCourse} from "./components/courses/InputCourse";
import {Course} from "./components/courses/Course";


const AppRoutes = [
  {
    index: true,
    element: <SignIn />
  },
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/auth/signin',
    element: <SignIn />
  },
  {
    path: '/email',
    element: <Email />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/profile/*',
    element: <Profile />
  },
  {
    path: '/users/*',
    element: <Profile />
  },
  {
    path: '/search',
    element: <Users />
  },
  {
    path: '/users',
    element: <Users />
  },
  {
    path: '/courses',
    element: <Courses />
  },
  {
    path: '/courses/new',
    element: <InputCourse />
  },
  {
    path: '/courses/*',
    element: <Course />
  }
];

export default AppRoutes;
