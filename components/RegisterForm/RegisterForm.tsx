import { useForm, SubmitHandler } from 'react-hook-form';
import css from './RegisterForm.module.css';
import { registerUser } from '@/lib/auth';
import { useState } from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi';

type RegisterFormProps = {
  onSuccess: () => void;
};

type Inputs = {
  email: string;
  password: string;
  name: string;
};

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

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
        {errors.name && <p>{errors.name.message}</p>}

        <input className={css.input} placeholder="Email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}

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
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button className={css.button} type="submit">
        Sign Up
      </button>
    </form>
  );
}
