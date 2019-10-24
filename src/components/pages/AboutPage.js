import React from 'react';
import { northwesternPurple10 } from 'util/colors';
import { Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import heroImage from 'images/hero-image.jpg';
import studentImage from 'images/surprised_student.svg';
import joonProfile from 'images/joon.jpeg';
import juliaProfile from 'images/julia.jpg';
import madisonProfile from 'images/madison.jpg';
import helenProfile from 'images/helen.jpg';
import kevinProfile from 'images/kevin.jpg';
import albertaProfile from 'images/alberta.jpg';

const heroHeight = 600;

const useStyles = makeStyles({
  hero: {
    backgroundImage: `url(${heroImage})`,
    minHeight: heroHeight,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  heroText: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: heroHeight,
    width: '100%',
    textAlign: 'center',
    color: 'white',
    paddingTop: '280px',
  },
  heroSubtitle: {
    color: 'inherit',
    paddingTop: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  blurbs: {
    textAlign: 'center',
    margin: '20px',
  },
  section: {
    padding: '50px',
  },
  sectionWithColor: {
    backgroundColor: `${northwesternPurple10}`,
    padding: '50px',
  },
  multipleColumns: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  studentImage: {
    width: '400px',
  },
  studentCard: {
    textAlign: 'center',
    width: '325px',
    height: '575px',
    margin: '10px',
  },
  profileImage: {
    borderRadius: '50%',
    width: '250px',
    margin: '10px',
  },
});

export default function AboutPage() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.hero} />
      <div className={classes.heroText}>
        <Typography variant="h3" color="inherit">Simple. Fast. Visual.</Typography>
        <Typography variant="h5" className={classes.heroSubtitle}>Course planning for Northwestern University.</Typography>
      </div>

      <div className={classes.section}>
        <Typography variant="h3" color="primary" className={classes.header}>Serif.nu redefines your scheduling experience.</Typography>

        <div className={classes.multipleColumns}>
          <div>
            <Typography variant="h5" className={classes.blurbs}>No more drawing out your schedules on paper.</Typography>
            <Typography variant="h5" className={classes.blurbs}>No more clunkly Excel spreadsheets.</Typography>
            <Typography variant="h5" className={classes.blurbs}>Plan out your next quarter at Northwestern with ease and speed.</Typography>
          </div>
          <img src={studentImage} alt="Student with a laptop" className={classes.studentImage} />
        </div>
      </div>

      <div className={classes.sectionWithColor}>
        <Typography variant="h3" color="primary" className={classes.header}>The Team</Typography>

        <Typography variant="h5" className={classes.blurbs}>Serif.nu is run by a team of previous and current Northwestern students dedicated to providing the best scheduling experience.</Typography>
        <div className={classes.multipleColumns}>
          <Paper elevation={2} className={classes.studentCard}>
            <img src={joonProfile} alt="Joon Park" className={classes.profileImage} />
            <Typography variant="h6">Joon Park</Typography>
            <Typography variant="subtitle1">Creator & Team Lead</Typography>
            <Typography className={classes.blurbs}>
              Software engineer at Grubhub, film composer in another life.
              Big fan of taking pictures that make me look like I&apos;m falling off of things.
            </Typography>
          </Paper>

          <Paper elevation={2} className={classes.studentCard}>
            <img src={kevinProfile} alt="Kevin Lee" className={classes.profileImage} />
            <Typography variant="h6">Kevin Lee</Typography>
            <Typography variant="subtitle1">Lead Student Developer</Typography>
            <Typography className={classes.blurbs}>
              Senior studying computer science...and nothing else!
              Strong enthusiast of deep dish pizza, the color turquoise, and Korean music.
            </Typography>
          </Paper>

          <Paper elevation={2} className={classes.studentCard}>
            <img src={madisonProfile} alt="Madison Dong" className={classes.profileImage} />
            <Typography variant="h6">Madison Dong</Typography>
            <Typography variant="subtitle1">Student Developer</Typography>
            <Typography className={classes.blurbs}>
              I’m a junior studying journalism,
              computer science, and design.
              My three pillars of life are: adventures with friends,
              7-Eleven Big Bite hot dogs, and Frank Ocean.
              Send me funny emails and/or articles: madisonfdong@gmail.com
            </Typography>
          </Paper>

          <Paper elevation={2} className={classes.studentCard}>
            <img src={albertaProfile} alt="Alberta Yoo" className={classes.profileImage} />
            <Typography variant="h6">Alberta Yoo</Typography>
            <Typography variant="subtitle1">Student Developer</Typography>
            <Typography className={classes.blurbs}>
              Hi, I’m Alberta! I’m a junior and currently
              studying computer science. Enthusiastic about
              the environment, love hot cheetos and
              just chillin
              {' '}
              <span role="img" aria-label="sunglasses face"> 😎</span>
            </Typography>
          </Paper>

          <Paper elevation={2} className={classes.studentCard}>
            <img src={juliaProfile} alt="Julia Tournant" className={classes.profileImage} />
            <Typography variant="h6">Julia Tournant</Typography>
            <Typography variant="subtitle1">Student Developer</Typography>
            <Typography className={classes.blurbs}>
              Hi! I’m Julia. I’m French, currently 19 years old, and will graduate in June 2021.
              I study computer science and enjoy learning foreign languages.
              I’m also a member of the varsity golf team here at NU!
              You can reach out to me at juliatournant2021@u.northwestern.edu.
            </Typography>
          </Paper>

          <Paper elevation={2} className={classes.studentCard}>
            <img src={helenProfile} alt="Helen Zhao" className={classes.profileImage} />
            <Typography variant="h6">Helen Zhao</Typography>
            <Typography variant="subtitle1">Student Developer</Typography>
            <Typography className={classes.blurbs}>
              I am Helen, a Northwestern junior.
              Love cooking, love taekwondo and especially love watching dogs sneeze
              <span role="img" aria-label="sneezing face"> 🤧</span>
            </Typography>
          </Paper>
        </div>
      </div>
    </div>
  );
}
