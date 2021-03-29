import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FFF88B', // TODO make COLORS constant
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