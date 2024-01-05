import './Button.css';

function Button({type, children, onClick, disabled = false, variant}) {
    return (
        <button type={type} disabled={disabled} onClick={onClick}
                className={(variant === 'cancel') ? 'button button-cancel'
                    : (variant === 'invisible') ? 'button button-invisible'
                        : (variant === 'disabled') ? 'button button-disabled'
                            : 'button button-primary'}>
            {children}
        </button>
    );
}

export default Button;