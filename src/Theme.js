import { createMuiTheme } from '@material-ui/core/styles';
import { colorYellow } from './StyleExports.module.scss';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: colorYellow
        },
        secondary: {
            main: '#000000'
        }
    },
    typography: {
        fontFamily: 'Nunito'
    }
});

export default theme;