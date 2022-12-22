import React from 'react';
import Button from '../components/Button';
import FormFrame from '../components/FormFrame';
import { useForm } from 'react-hook-form';

const PassRecoveryForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (e) => alert(JSON.stringify(e));

  return (
    <FormFrame onSubmit={handleSubmit(onSubmit)}>
      <div className='form_heading'>
        <p className='form_title'>Восстановление пароля</p>
      </div>
      <label className='form_input_wrapper'>
        <p className='form_input_label'>E-mail*</p>
        <input
          type='email'
          className='form_input'
          {...register('email')}
          required
        />
      </label>
      <Button type='submit' style={{ marginTop: '70px' }}>
        Отправить
      </Button>
    </FormFrame>
  );
};

export default PassRecoveryForm;
