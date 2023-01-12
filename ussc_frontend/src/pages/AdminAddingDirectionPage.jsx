import GoBackButton from '../components/GoBackButton';
import Button from '../components/Button';
import plusIcon from '../img/plus.svg';
import RolesEdit from '../components/RolesEdit';
import { useFieldArray, useForm } from 'react-hook-form';
import {sendCheckTest} from "../store/slices/testCheckSlice";
import {useDispatch} from "react-redux";
import {paste} from "@testing-library/user-event/dist/paste";
import {createDirections} from "../store/slices/directionSlice";
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminAddingDirectionPage() {
  let navigate = useNavigate();
  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: {
      direction_name: '',
      direction_description: '',
      roles: [],
    },
  });
  const dispatch = useDispatch();

  const onSubmit = (payload) => {

    toast.promise(dispatch(createDirections({descriptions: payload.direction_description, name: payload.direction_name, roles:payload.roles})), {
      pending: 'Выполняю запрос',
      success: 'Запрос успешно выполнен 👌',
      error: 'Запрос отклонён 🤯'
      // });
    }).then(result => navigate('/admin/create/testcase/'+result.payload));
    // console.dir(payload);
    // dispatch(createDirections({descriptions: payload.direction_description, name: payload.direction_name, roles:payload.roles}))
    //     .then(result => navigate('/admin/create/testcase/'+result.payload));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='content_wrapper'>
        <div className='edits'>
          <GoBackButton />

          <div className='heading'>Добавить направление</div>
          <div className='direction_forms'>
            <div className='direction_form name'>
              <h3>Название направления</h3>
              <textarea
                {...register('direction_name', { required: true })}
                cols='40'
                rows='3'
                placeholder='Название...'
              ></textarea>
            </div>

            <RolesEdit setValue={setValue} formControl={control} />

            <div className='direction_form image'>
              <h3>Добавить изображение</h3>
              <label className='input_file'>
                <input type='file' />
                <span className='label'>
                  <img src={plusIcon} /> Выберите изображение
                </span>
              </label>
            </div>

            <div className='direction_form description'>
              <h3>Описание направления</h3>
              <textarea
                name='direction_description'
                {...register('direction_description', { required: true })}
                cols='40'
                rows='3'
                placeholder='Описание...'
              ></textarea>
            </div>

            <Button type='submit'>Добавить направление</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
