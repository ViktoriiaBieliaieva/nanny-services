import { useForm, SubmitHandler } from 'react-hook-form';
import css from './LoginForm.module.css';
import { loginUser } from '@/lib/auth';
import { useState } from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type LoginFormProps = {
  onSuccess: () => void;
};

type Inputs = {
  email: string;
  password: string;
};

const LoginFormSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(LoginFormSchema),
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      await loginUser(data.email, data.password);
      onSuccess();
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.formTitle}>Log In</h2>
      <p className={css.formText}>
        Welcome back! Please enter your credentials to access your account and continue your
        babysitter search.
      </p>
      <div className={css.formInputs}>
        <input className={css.input} placeholder="Email" {...register('email')} />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
        <div className={css.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className={css.input}
            {...register('password')}
          />

          <button
            className={css.passwordButton}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>
        {errors.password && <p className={css.error}>{errors.password.message}</p>}
      </div>

      <button className={css.button} type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
}
