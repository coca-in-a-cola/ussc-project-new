export default function TableHeader({ type }) {
  switch (type) {
    case 'applications':
      return <ApplicationsHeader />;
    case 'interns':
      return <InternsHeader />;
    case 'profile_application':
      return <ProfileApplicationHeader />;
      case 'tests':
          return <TestsHeader />;
      case 'practicants':
          return <PracticantsHeader />;
    default:
      throw new Error('Incorrect TableHeader type');
  }
}

function ApplicationsHeader() {
  return (
    <div className='row headers'>
      <span>ФИО</span>
      <span>Дата первой</span>
      <span>Непроверенные заявки</span>
    </div>
  );
}

function PracticantsHeader() {
    return (
        <div className='row headers'>
            <span>ФИО</span>
            <span>Статус практиканта</span>
        </div>
    );
}

function ProfileApplicationHeader() {
  return (
    <div className='row headers'>
      <span>Направление</span>
      <span>Роль</span>
      <span>Дата подачи</span>
      <span>Статус</span>
    </div>
  );
}

function TestsHeader() {
    return (
        <div className='row headers'>
            <span>ФИО</span>
            <span>Направление</span>
            <span>Роль</span>
            <span>Статус тестового</span>
        </div>
    );
}

function InternsHeader() {}
