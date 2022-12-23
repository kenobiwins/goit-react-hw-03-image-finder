import { ButtonStyle } from './Button.styled';

export const Button = ({ loadMore }) => {
  return <ButtonStyle onClick={loadMore}>Load more</ButtonStyle>;
};
