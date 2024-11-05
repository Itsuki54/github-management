import { Item } from '@/types/github';

export const Card = ({ item }: { item: Item }) => {
  return (
    <div>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </div>
  );
}