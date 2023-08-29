import * as Yup from 'yup';

export const signUpSchema=Yup.object(
    {
        heading1:Yup.string().min(3).max(23).required("Please enter heading"),
        description1:Yup.string().min(15).max(50).required("PLease enter description"),
       
    }
)

