import PropTypes from 'prop-types';
import styles from './text.module.css';
import { MdInsights } from 'react-icons/md';
export const SideTextAbt = ({ children, style, noIcon }) => {
    return (
        <div className={styles.sideText_div_abt}>
            <h2
                className={styles.sideText}
                style={{
                    textAlign: 'left',

                    ...style,
                }}
            >
                {!noIcon ? <MdInsights style={{ marginRight: '8px' }} /> : ''}
                {children}
            </h2>
        </div>
    );
};

SideTextAbt.propTypes = {
    children: PropTypes.any,
    style: PropTypes.object,
    noIcon: PropTypes.bool,
};
