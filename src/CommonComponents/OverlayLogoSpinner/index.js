import Logo from "../Logo";
import './OverlayLogoSpinner.scss';

export default function OverlayLogoSpinner() {
    return (
        <div className='overlay'>
            <Logo shouldAnimate={true} animationSpeed={250} />
        </div>
    );
}