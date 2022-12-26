import FormFrame from '../components/FormFrame';
import Button from '../components/Button';
import { useAuth } from '../hooks/use-auth';
import SignInForm from './SignInForm';
import InputRadio from '../components/InputRadio';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { sendApplication } from '../store/slices/applicationSlice';

// const firstName = register('firstName', { required: true })
//     <TextInput
// name={firstName.name}
// onChange={firstName.onChange}
// onBlur={firstName.onBlur}
// inputRef={firstName.ref} // you can achieve the same for different ref name such as innerRef
// />

export default function SendApplicationForm({ direction, ...props }) {
  const user = useAuth();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  if (!user.isAuth) return <SignInForm />;

  const onSubmit = (role) => {
    if (role.roleId === null) {
      alert('Выберите роль');
      return;
    }

    dispatch(sendApplication({ roleId: role.roleId, userId: user.id }));
  };

  return (
    <FormFrame onSubmit={handleSubmit(onSubmit)}>
      <div
        className='form_heading'
        style={{ justifyContent: 'center', marginBottom: '35px' }}
      >
        <p className='form_title'>Выберите интересующую Вас роль</p>
      </div>
      <div className='form_radio' style={{ marginBottom: '50px' }}>
        {direction.roles.map((direction) => {
          const radio = register('roleId');

          return (
            <InputRadio
              key={direction.id}
              text={direction.directions}
              onChange={radio.onChange}
              onBlur={radio.onBlur}
              inputRef={radio.ref}
              name={radio.name}
              id={direction.id}
              value={direction.id}
            />
          );
        })}
      </div>

      <Button type='submit'>Отправить</Button>
    </FormFrame>
  );
}
