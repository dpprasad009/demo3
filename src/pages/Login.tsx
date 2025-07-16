import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { LogIn } from 'lucide-react';

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const login = useStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoginError(null);
    const loggedInUser = await login(data.email, data.password);
    if (loggedInUser) {
      if (loggedInUser.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } else {
      setLoginError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
  <div>
    <label htmlFor="email-address" className="sr-only">Email address</label>
    <input
      id="email-address"
      type="email"
      autoComplete="email"
      {...register('email', { required: 'Email is required' })}
      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
      placeholder="Email address"
    />
    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
  </div>
  <div>
    <label htmlFor="password" className="sr-only">Password</label>
    <input
      id="password"
      type="password"
      autoComplete="current-password"
      {...register('password', { required: 'Password is required' })}
      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
      placeholder="Password"
    />
    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
  </div>
</div>


          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{loginError}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-primary-500 group-hover:text-primary-400" aria-hidden="true" />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
