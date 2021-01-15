import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const styles = makeStyles((theme: Theme) =>
createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export default styles;