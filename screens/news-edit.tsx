import { FC, useState, useEffect } from 'react';
import { editPostData } from '@/types/post-data';

interface INewsEditProps {
  postId: number;
}

interface Post {
  id: number;
  title: string;
  date: string;
  description: string;
}

const NewsEditPage: FC<INewsEditProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [edit, setEdit] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch('http://localhost:3001/news/get-single', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: postId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch post data');
        }

        const postData = await response.json();
        setPost(postData);
        setEdit(postData); // Set edit state after post state is updated
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <>
      {post && (
        <>
          <form className='bg-red-50 p-5 mr-5 mt-5 rounded-2xl'>
            <div className='flex flex-col max-w-[888px] mx-auto'>
              <h2 className='font-semibold text-xl'>Редактировать пост:</h2>
              <input
                type='text'
                placeholder='Заголовок:'
                className='input input-bordered input-error w-full mt-5'
                value={edit?.title || ''}
                onChange={(e) => setEdit({ ...edit!, title: e.target.value })} 
              />
              <textarea
                className="textarea textarea-error mt-5"
                placeholder="Текст Для Правки:"
                value={edit?.description || ''}
                onChange={(e) => setEdit({ ...edit!, description: e.target.value })} 
              ></textarea>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default NewsEditPage;
