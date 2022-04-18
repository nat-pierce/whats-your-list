import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../Constants";
import Logo from "../Logo";
import './OverlayLogoSpinner.scss';

export default function OverlayLogoSpinner() {
    const [shouldShowButton, setShouldShowButton] = useState(false);

    const onClickTryAgain = () => {
        window.location.href = BASE_URL;
    }

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setShouldShowButton(true);
        }, 5000);

        return () => {
            clearTimeout(timeoutId);
        }
    }, []);

    return (
        <div className='overlay'>
            <Logo shouldAnimate={true} animationSpeed={250} />
            {shouldShowButton &&
                <Button 
                    className='try-again-button' 
                    onClick={onClickTryAgain}
                    variant='contained'
                >
                    Try again
                </Button>
            }
        </div>
    );
}