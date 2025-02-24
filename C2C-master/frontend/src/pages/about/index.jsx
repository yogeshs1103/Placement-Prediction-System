import { useContext } from 'react';
import { Header } from '../../components/header';
import { Abt1 } from './charts/Abt1';
import styles from './home.module.css';
import PropTypes from 'prop-types';
import { AppContext } from '../../contexts/AppContext';

export const About = () => {
    const { isMobile } = useContext(AppContext);
    return (
        <>
            <Header />
            <div style={{ fontFamily: 'var(--font-primary)' }}>
                <div
                    className={styles.bg_img_div}
                    style={{ height: '100vh', zIndex: 12 }}
                >
                    <img
                        className={styles.bg_img}
                        src='/static/images/Pd_bg.png'
                    />
                </div>
                <h1
                    style={{
                        position: 'absolute',
                        top: 100,
                        zIndex: 4,
                    }}
                    className={styles.title}
                >
                    Our <span className={styles.textHover}>Team</span>{' '}
                        consists of 
                        devoted students 
                        who are committed to <span className={styles.textHover}>
                        achieving excellence...</span>
                </h1>
                

                <div
                    style={{
                        position: 'absolute',
                        right: 170,
                        top: 100,
                        zIndex: 3,
                    }}
                    className={styles.mainImg_div}
                >
                    {!isMobile ? (
                        <img
                            className={styles.mainImg}
                            style={{ width: '100%' }}
                            src='/assets/images/logo.png'
                        />
                    ) : (
                        ''
                    )}
                </div>
                <Abt1 isMobile={isMobile} />
                
                
            </div>
        </>
    );
};

About.propTypes = {
    isMobile: PropTypes.bool,
};





// Our <span className={styles.textHover}>Team</span>{' '}
//                         consists of devoted students 
//                         who are committed to <span className={styles.textHover}>
//                         achieving excellence</span>.