import { FC, useState, useEffect } from 'react';
import ProfileHeader from './profile-header';

import Action from '@/types/action';
import User from '@/types/user';

type UserActionProps = Pick<User, 'id'>;

const UserActions: FC<UserActionProps> = ({ id }) => {
  const [actions, setActions] = useState<Action[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserActions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actions/get-by-id`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ id }),
				});

        if (!response.ok) {
          if (response.status === 404) {
            setError("Действия пользователя не найдены.");
          } else {
            throw new Error('Failed to fetch user actions');
          }
        } else {
          const data = await response.json();
          setActions(data);
        }
      } catch (error) {
        console.error('Error fetching user actions:', error);
        setError("Ошибка при получении действий пользователя."); // Corrected the error message
      }
    };

    fetchUserActions();
  }, [id]);

  return (
		<>
			<ProfileHeader text='Действия пользователя' />
			{actions.length === 0 ? (
				<div className='text-center bg-red-50 p-5 mr-5 mt-5 rounded-2xl'>Действий пользователя не найдены.</div>
			) : (
				actions.map((action) => (
					<div key={action.id} className={'flex justify-between bg-red-50 p-5 mr-5 mt-5 rounded-2xl'}>
						<span>{action.action}</span>
						<span>{action.date.toString()}</span>
					</div>
				))
			)}
		</>
	);
	
};

export default UserActions;
