import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import { Email } from "./components/auth/Email";
import { Users } from "./components/users/Users";

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
    path: '/users',
    element: <Users />
  }
];

export default AppRoutes;
