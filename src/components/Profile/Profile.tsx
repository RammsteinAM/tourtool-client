import React, { useEffect, useState } from 'react';
import { RootState } from '../../redux/store';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";
import { authActions } from '../../redux/auth/actions';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { ErrorMessage, Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { ActionStatus } from '../../types/main';
import CircularProgress from '@material-ui/core/CircularProgress';
import { userActions } from '../../redux/user/actions';
import { UserUpdateReqData } from '../../types/user';
import { useSnackbar } from 'notistack';
import Link from '@material-ui/core/Link';
import toast from '../IndependentSnackbar';
import profileStyles from './profileStyles';
import mainStyles from '../../styles/mainStyles';
import DeleteAccountDialog from './DeleteAccountDialog';
import DeleteAccountSuccessDialog from './DeleteAccountSuccessDialog';

interface FormValues {
  displayName?: string;
  currentPassword?: string;
  password?: string;
  confirmPassword?: string;
}

interface Props {
}

const Profile = (props: Props) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState<boolean>(false);
  const classes = profileStyles();
  const mainClasses = mainStyles();
  const authState = useSelector((state: RootState) => state.auth);
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    setSubmitting(userState.update.status === ActionStatus.Request);
  }, [userState.update.status]);

  const handleLogout = () => {
    dispatch(authActions.logout());
  }

  const handleFormSubmit = (values: FormValues): void => {
    const userUpdateData: UserUpdateReqData = {
      id: authState.data!.id,
      displayName: values.displayName,
      currentPassword: values.currentPassword,
      password: values.password,
    }
    userUpdateData.id && dispatch(userActions.updateUser(userUpdateData));
    setSubmitting(true);
  }

  const openDeleteAccountDialog = () => {
    setDeleteAccountDialogOpen(true);
  }

  const closeDeleteAccountDialog = () => {
    setDeleteAccountDialogOpen(false);
  }

  const closeDeleteAccountSuccessDialog = () => {
    dispatch(userActions.requestDeleteReset());
  }

  const handleDeleteConfirm = () => {
    authState.data?.id && dispatch(userActions.deleteUserEmailRequest());
    setDeleteAccountDialogOpen(false);
  }

  if (authState.status !== ActionStatus.Success) {
    return (
      <div>
        {t('You are logged out')}
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <Typography>
        {t("Your Profile")}
      </Typography>
      <Formik
        initialValues={{ displayName: '', currentPassword: '', password: '', confirmPassword: '' }}
        validate={values => {
          const errors: FormValues = {};
          const { currentPassword, password, confirmPassword } = values;
          if (!currentPassword && !password && !confirmPassword) {
            return errors;
          }
          if (!values.currentPassword) {
            errors.currentPassword = t('Please enter the Password');
          }
          if (!values.password) {
            errors.password = t('Please enter the Password');
          } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = t('Passwords do not match');
          } else if (
            !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/.test(values.password)
          ) {
            errors.password = t('password-validation-error');
          }
          return errors;
        }}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              size="small"
              defaultValue={authState.data?.displayName}
              fullWidth
              id="displayName"
              label={t('Display Name')}
              name="displayName"
              autoComplete="displayName"
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.textField}
            />
            <TextField
              size="small"
              disabled
              value={authState.data?.email}
              fullWidth
              id="email"
              label={t('Email')}
              className={classes.textField}
            />
            {!authState.data?.social &&
              <>
                <TextField
                  error={!!errors.password && touched.password}
                  fullWidth
                  name="currentPassword"
                  label={t('Current Password')}
                  type="password"
                  id="currentPassword"
                  autoComplete="current-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                />
                <div className={mainClasses.formErrorContainer}>
                  {errors.currentPassword && touched.currentPassword &&
                    <ErrorMessage name="currentPassword" component="div" className={mainClasses.formError} />}
                </div>
                <TextField
                  error={!!errors.password && touched.password}
                  fullWidth
                  name="password"
                  label={t('New Password')}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                />
                <div className={mainClasses.formErrorContainer}>
                  {errors.password && touched.password &&
                    <ErrorMessage name="password" component="div" className={mainClasses.formError} />}
                </div>
                <TextField
                  error={!!errors.password && touched.password}
                  fullWidth
                  name="confirmPassword"
                  label={t('Confirm Password')}
                  type="password"
                  id="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                />
                <div className={mainClasses.formErrorContainer}>
                  {errors.confirmPassword && touched.confirmPassword &&
                    <ErrorMessage name="confirmPassword" component="div" className={mainClasses.formError} />}
                </div>
              </>
            }
            <br />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={submitting}
              className={classes.button}
            //onClick={() => showSnackbars(errors)}
            >
              {t('Save')}
            </Button>
            {userState.update.status === ActionStatus.Request &&
              <div className={mainClasses.progress}>
                <CircularProgress />
              </div>
            }
          </form>
        )}
      </Formik>
      <Link href="" style={{ color: 'red', textAlign: 'center', marginBottom: '12px' }} onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        openDeleteAccountDialog()
      }}>
        {t("Delete Account")}
      </Link>
      <Button
        type="button"
        variant="contained"
        color="secondary"
        className={clsx(classes.button, classes.logoutBtn)}
        onClick={handleLogout}
      >
        {t('Logout')}
      </Button>
      <DeleteAccountDialog
        open={deleteAccountDialogOpen}
        onClose={closeDeleteAccountDialog}
        onConfirm={handleDeleteConfirm}
      />
      <DeleteAccountSuccessDialog
        open={
          userState.requestDelete.status === ActionStatus.Success ||
          userState.requestDelete.status === ActionStatus.Failure
        }
        onClose={closeDeleteAccountSuccessDialog}
      />
    </div>
  );
}

export default Profile;