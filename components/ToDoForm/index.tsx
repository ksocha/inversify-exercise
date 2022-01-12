import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export type FormValues = {
  title: string;
};

export type Props = {
  onSubmit: (values: FormValues) => Promise<void>;
};

const ToDoForm = ({ onSubmit }: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  const submitData = handleSubmit(async (values) => {
    await onSubmit(values);

    setTimeout(() => {
      reset();
    });
  });

  return (
    <form onSubmit={submitData}>
      <FormControl isInvalid={!!errors.title}>
        <Textarea
          {...register('title', {
            required: 'Please, type something',
          })}
          placeholder='What are you going to do next?'
          size='sm'
          resize='none'
        />
        {errors.title && (
          <FormErrorMessage>{errors.title.message}</FormErrorMessage>
        )}
      </FormControl>

      <Center>
        <Button type='submit' mt={4} isLoading={isSubmitting}>
          Add item
        </Button>
      </Center>
    </form>
  );
};

export default ToDoForm;
