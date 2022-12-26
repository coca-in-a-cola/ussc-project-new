import listItemIcon from '../img/list_circle.svg';
import crossIcon from '../img/roleCross.svg';
import plusAddIcon from '../img/roleAdd.svg';
import { useFieldArray } from 'react-hook-form';

export default function RolesEdit({ setValue, formControl }) {
  const { fields, update, append, remove } = useFieldArray({
    name: 'roles',
    control: formControl,
    rules: {
      required: true,
    },
  });
  const addRole = () => {
    append({ value: '' });
  };

  const removeRole = (fieldId) => {
    const index = fields.findIndex((field) => {
      return field.id === fieldId;
    });
    return () => {
      if (index > 0) setValue(`roles.${index}.value`, fields[index].value);
      remove(index);
    };
  };

  const updateRole = (index) => {
    return (value) => {
      setValue(`roles.${index}.value`, value);
    };
  };

  return (
    <div className='direction_form roles roles_edit'>
      <h3>Роли</h3>
      <div className='help'>
        Подсказка: введите роль по предложенному шаблону - <br />
        “1 тестировщик”
      </div>

      {fields.map((field, index) => {
        return (
          <Role
            key={index}
            onRemove={removeRole(field.id)}
            update={updateRole(index)}
          />
        );
      })}

      <AddButton onClick={addRole} />
    </div>
  );
}

function Role({ name, id, update, onRemove, onAddTestCase, inputKey }) {
  return (
    <div className='role'>
      <div>
        <div className='name'>
          <img src={listItemIcon} alt='' />
          <input
            type='text'
            name=''
            id=''
            onChange={(event) => {
              update(event.target.value);
            }}
            placeholder='Название роли'
          />
        </div>
        <button onClick={onRemove} type='button'>
          <img src={crossIcon} alt='' />
        </button>
      </div>
      {/*<a href=''>Добавить тестовое</a>*/}
    </div>
  );
}

function AddButton({ ...props }) {
  return (
    <button {...props} type='button'>
      <div className='role'>
        <div className='name add'>
          <img src={plusAddIcon} alt='' />
          Добавить вариант
        </div>
      </div>
    </button>
  );
}
