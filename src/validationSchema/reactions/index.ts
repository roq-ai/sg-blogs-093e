import * as yup from 'yup';

export const reactionValidationSchema = yup.object().shape({
  type: yup.string().required(),
  user_id: yup.string().nullable(),
  post_id: yup.string().nullable(),
});
