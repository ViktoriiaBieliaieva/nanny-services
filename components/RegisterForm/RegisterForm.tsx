import { useForm, SubmitHandler } from 'react-hook-form';
import css from './RegisterForm.module.css';
import { registerUser } from '@/lib/auth';
import { useState } from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type RegisterFormProps = {
  onSuccess: () => void;
};

type Inputs = {
  email: string;
  password: string;
  name: string;
};

const RegisterFormSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name must be at most 30 characters')
    .required('Name is required'),
  email: Yup.string().trim().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .required('Password is required'),
});

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(RegisterFormSchema),
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      await registerUser(data.name, data.email, data.password);
      onSuccess();
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.formTitle}>Registration</h2>
      <p className={css.formText}>
        Thank you for your interest in our platform! In order to register, we need some information.
        Please provide us with the following information.
      </p>
      <div className={css.formInputs}>
        <input className={css.input} placeholder="Name" {...register('name')} />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}

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
        {isSubmitting ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}
