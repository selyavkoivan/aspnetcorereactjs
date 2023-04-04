import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import { Email } from "./components/auth/Email";
import { Profile } from "./components/users/user/Profile";

import { InputDepartment } from "./components/university/inputDepartment";
import { InputFaculty } from "./components/university/inputFaculty";
import { InputCourse } from "./components/university/inputCourse";
import { InputGroup } from "./components/university/inputGroup";
import { InputSpeciality } from "./components/university/inputSpeciality";
import { InputStudent } from "./components/university/inputStudent";
import { InputTeacher } from "./components/university/inputTeacher";


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
    path: '/department/add',
    element: <InputDepartment />
  },
  {
    path: '/faculty/add',
    element: <InputFaculty />
  },
  {
    path: '/course/add',
    element: <InputCourse />
  },
  {
    path: '/group/add',
    element: <InputGroup />
  },
  {
    path: '/speciality/add',
    element: <InputSpeciality />
  },
  {
    path: '/student/add',
    element: <InputStudent />
  },
  {
    path: '/teacher/add',
    element: <InputTeacher />
  }
  
  
  
];

export default AppRoutes;
