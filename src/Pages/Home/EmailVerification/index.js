import React, { useState } from 'react';
import MailIcon from '@material-ui/icons/MailOutline';
import CheckIcon from '@material-ui/icons/Check';
import './EmailVerification.scss';
import Button from '@material-ui/core/Button';

export function EmailVerification({ 
    email,
    onClickSendEmail
}) {
    const [hasClickedSendAgain, setHasClickedSendAgain] = useState(false);

    return (
        <div className='email-verification-page'>
            <div className='icons'>
                <CheckIcon />
                <MailIcon />
            </div>
            <div className='message'>Email verification sent to</div>
            <div className='email-address'>{email}</div>
            <div className='send-again-wrapper'>
                {hasClickedSendAgain
                    ? <>
                        <Button 
                            color="primary" 
                            variant="contained" 
                            disabled={true}
                            onClick={undefined}
                        >
                            Sent
                        </Button>
                        <div className='spam-warning'>
                            Make sure to check your spam folder!
                        </div>
                    </>
                    : <Button 
                        color="primary" 
                        variant="contained" 
                        onClick={() => {
                            setHasClickedSendAgain(true);
                            onClickSendEmail();
                        }}
                    >
                        Send again
                    </Button>
                }
            </div>
        </div>
    );
}