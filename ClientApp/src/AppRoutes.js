import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";

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
    path: '/signup',
    element: <SignUp />
  }
];

export default AppRoutes;
