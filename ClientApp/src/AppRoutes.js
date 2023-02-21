import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import { Email } from "./components/auth/Email";

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
  }
];

export default AppRoutes;
