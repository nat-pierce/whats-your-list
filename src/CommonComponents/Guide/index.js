import Joyride from 'react-joyride';
import './Guide.scss';
import Button from '@material-ui/core/Button';

export default function Guide() {
    const steps = [
        {
            target: '.search',
            content: 'Get started by adding your favorite movie here!',
            disableBeacon: true
        }
    ];

    const Tooltip = ({
        continuous,
        index,
        step,
        backProps,
        closeProps,
        primaryProps,
        tooltipProps
    }) => (
        <div {...tooltipProps} className='guide-tooltip'>
            {step.title && <h1>{step.title}</h1>}
            <div className='content'>{step.content}</div>
            <div className='footer'>
                {index > 0 && (
                    <Button {...backProps} className='action-button' variant="contained" color="primary">
                        Back
                    </Button>
                )}
                {continuous && (
                    <Button {...primaryProps} className='action-button' variant="contained" color="primary">
                        Next
                    </Button>
                )}
                {!continuous && (
                    <Button {...closeProps} className='action-button' variant="contained" color="primary">
                        Close
                    </Button>
                )}
            </div>
        </div>
    );

    return (
        <Joyride
            steps={steps}
            tooltipComponent={Tooltip}
        />  
    );
}