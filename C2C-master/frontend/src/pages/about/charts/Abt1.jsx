import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import PropTypes from 'prop-types'
import styles from '../home.module.css'
import { Container } from '@mui/material'
import { HeadText } from '../../../components/Headtext'
import { AbtTier1 } from '../../../components/charts/AbtTier1'
import { AbtTier2 } from '../../../components/charts/AbtTier2'
import { AbtTier3 } from '../../../components/charts/AbtTier3'
import { AbtTier4 } from '../../../components/charts/AbtTier4'
import { SideTextAbt } from '../../../components/SideTextAbt'

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance])
}

const Chart = ({ img, tier, isMobile, insight }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 260)
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={
          isMobile
            ? {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }
            : { display: 'flex', alignItems: 'center' }
        }
      >
        <div ref={ref} className={styles.cgpa_chart_background}>
          {img}
        </div>
        {!isMobile ? (
          <motion.h3
            style={{
              y,

              fontFamily: 'var(--font-secondary)',

              marginLeft: '18px',
              whiteSpace: 'nowrap',
            }}
            className={styles.cgpa_tier}
          >
             {tier}
          </motion.h3>
        ) : (
          <h3 style={{ textAlign: 'center' }}>TIER {tier}</h3>
        )}
      </div>
      <SideTextAbt>{insight}</SideTextAbt>
    </div>
  )
}
export const Abt1 = ({ isMobile }) => {
  const imgVariants = {
    offscreen: {
      y: -500,
      opacity: 0,
      rotate: 0,
    },
    onscreen: {
      y: 20,
      rotate: 235,
      opacity: 0.5,
      transition: {
        type: 'spring',
        duration: 1.5,
      },
    },
  }
  const imgVariants2 = {
    offscreen: {
      y: 500,
      opacity: 0,
      rotate: 0,
    },
    onscreen: {
      y: 0,
      rotate: 235,
      opacity: 0.5,
      transition: {
        type: 'spring',
        duration: 2,
      },
    },
  }

  return (
    <div
      style={{
        // background:
        //   'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(110,147,165,1) 30%, rgba(93,135,155,1) 70%, rgba(255,255,255,1) 100%)',

        zIndex: 1,
        position: 'relative',
        //backgroundImage: 'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)',
        // backgroundColor: '#f6f6f6',
        // backgroundImage: 'linear-gradient(0deg, #D9AFD9 0%, #f6f6f6 100%)',
        backgroundImage: 'linear-gradient(0deg, #D9AFD9 0%, #f6f6f6 47%)',
      }}
    >
      <Container maxWidth="lg">
        <HeadText style={{ padding: '2rem 0 0 0' }}>
        <span className={styles.PdtextHover}>Meet Our Dynamic Team : Crafting the Future of Placement Prediction</span>
        </HeadText>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: '3rem',
          }}
        >
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
          >
            <motion.img
              variants={imgVariants}
              className={styles.decors}
              style={{
                position: 'absolute',
                top: -230,
                left: 40,
                transform: 'rotate(235deg)',

                zIndex: 2,
              }}
              src="/static/images/rec_circle.svg"
            ></motion.img>
          </motion.div>

          <Chart
            img={<AbtTier1 />}
            tier={'Team Lead'}
            isMobile={isMobile}
            insight="Guiding the project's vision and coordinating team efforts towards success."
          />

          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
          >
            <motion.img
              variants={imgVariants2}
              className={styles.decors}
              style={{
                position: 'absolute',
                top: 550,
                right: 40,
                transform: 'rotate(235deg)',

                zIndex: 2,
              }}
              src="/static/images/circles_gradient.svg"
            ></motion.img>
          </motion.div>
          <Chart
            img={<AbtTier2 />}
            tier={'Data Scientist'}
            isMobile={isMobile}
            insight="Leveraging data analysis and machine learning to derive valuable insights and predictions."
          />
          {!isMobile && (
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
            >
              
        <Chart
            img={<AbtTier3 />}
            tier={'Backend Developer'}
            isMobile={isMobile}
            insight="Architecting robust server-side systems to support the application's functionality."
          />        
              <motion.img
                variants={imgVariants2}
                className={styles.decors}
                style={{
                  position: 'absolute',
                  top: 1300,
                  left: 40,
                  transform: 'rotate(235deg)',
                  zIndex: 2,
                }}
                src="/static/images/rectangles.svg"
              ></motion.img>
            </motion.div>
          )}

          <Chart
            img={<AbtTier4 />}
            tier='Frontend Developer'
            isMobile={isMobile}
            insight="Crafting intuitive user interfaces for seamless interaction and experience."
          />
        </div>
      </Container>
    </div>
  )
}

Chart.propTypes = {
  tier: PropTypes.name,
  img: PropTypes.object,
  isMobile: PropTypes.bool,
  insight: PropTypes.string,
}

Abt1.propTypes = {
  isMobile: PropTypes.bool,
}
