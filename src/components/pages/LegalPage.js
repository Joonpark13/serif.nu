import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { pageContainer, pageBody } from './common/styles';
import PageTitle from './common/PageTitle';

export const styles = {
  pageContainer,
  pageBody,
  section: {
    margin: '30px 0',
  },
};

function LegalPage({ classes }) {
  return (
    <div className={classes.pageContainer}>
      <PageTitle title="Serif.nu - Legal" />

      <div className={classes.pageBody}>
        <Typography variant="body1">
          &copy; 2017
          {' '}
          <a href="http://joonpark.me/">Joon Park</a>
        </Typography>
        <Typography variant="body1">
          Serif.nu is not created by Northwestern University.
        </Typography>

        <div className={classes.section}>
          <Typography variant="h4">
            Terms of Service
          </Typography>

          <ol>
            <li>
              <Typography variant="h6">Terms</Typography>
              <Typography variant="body1">
                By accessing this web site, you are agreeing to be bound by these web site Terms of
                Service, all applicable laws and regulations, and agree that you are responsible for
                compliance with any applicable local laws. If you do not agree with any of these
                terms, you are prohibited from using or accessing this web site. The materials
                contained in this web site are protected by applicable copyright and trade mark law.
              </Typography>
            </li>
            <li>
              <Typography variant="h6">Disclaimer</Typography>
              <Typography variant="body1">
                The materials on Serif.nu are provided &quot;as is.&quot; Serif.nu makes no
                warranties, expressed or implied, and hereby disclaims and negates all other
                warranties, including without limiation, implied warranties or conditions of
                merchantability, fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights. Further, Serif.nu does not
                warrant or make any representations concerning the accuracy, likely results, or
                reliablility of the use of the materials on the web site or otherwise relating to
                such materials or on any web sites linked to this web site.
              </Typography>
            </li>
            <li>
              <Typography variant="h6">Errata</Typography>
              <Typography variant="body1">
                The materials appearing on Serif.nu&apos;s web site could include technical,
                typographical, or photographic errors. Serif.nu does not warrant that any of the
                materials on its web site are accurate, complete, or current. Serif.nu may make
                changes to the materials contained on its web site at any time without notice.
              </Typography>
            </li>
            <li>
              <Typography variant="h6">Limitations</Typography>
              <Typography variant="body1">
                In no ever shall Serif.nu or its creators be liable for any damages (including,
                without limitation, damanges for loss of data or profit, or due to business
                interruption) arising out of the use or inability to use the materials on Serif.nu,
                even if Serif.nu or Serif.nu&apos;s creators have been notified orally or in writing
                of the possibility of such damage.
              </Typography>
            </li>
            <li>
              <Typography variant="h6">Links</Typography>
              <Typography variant="body1">
                Serif.nu has not reviewed all of the sites linked to its Internet web site and is
                not responsible for the contents of any such linked site. The inclusion of any link
                does not imply endorsement by Serif.nu of the site. Use of any such linked web site
                is at the user&apos;s own risk.
              </Typography>
            </li>
            <li>
              <Typography variant="h6">Terms of Service Modifications</Typography>
              <Typography variant="body1">
                Serif.nu may revise these Terms of Service at any time without notice. By using this
                web site you are agreeing to be bound by the current version of the Terms of Service
                at the time.
              </Typography>
            </li>
            <li>
              <Typography variant="h6">Governing Law</Typography>
              <Typography variant="body1">
                Any claim relating to Serif.nu shall be governed by the laws of the State of
                Illinois without regard to its conflict of law provisions.
              </Typography>
            </li>
          </ol>
        </div>

        <div className={classes.section}>
          <Typography variant="h4" gutterBottom>
            Privacy Policy
          </Typography>

          <Typography variant="body1">
            Your privacy is very important to us. Accordingly, we have developed this Policy in
            order for you to understand how we collect, use, communicate and disclose and make use
            of personal information. The following outlines our privacy policy.
          </Typography>

          <Typography variant="body1">
            <ul>
              <li>
                We will collect and use of personal information solely with the objective of
                bettering the user&apos;s experience or for other compatible purposes.
              </li>
              <li>
                We will only retain personal information as long as necessary for the fulfillment of
                those purposes.
              </li>
              <li>
                We will collect personal information by lawful and fair means and, where
                appropriate, with the knowledge or consent of the individual concerned.
              </li>
              <li>
                We will attempt to protect personal information by reasonable security safeguards
                against loss or theft, as well as unauthorized access, disclosure, copying, use or
                modification.
              </li>
              <li>
                We will make readily available to users information about our policies and practices
                relating to the management of personal information.
              </li>
              <li>
                We may use analytics software, including but not limited to, Google Analytics, etc.
                Such data collected will be used solely for the purpose of improving the user
                experience.
              </li>
              <li>
                We use local storage technologies, including Cookies, localStorage, etc. to enhance
                your experience.
              </li>
            </ul>
          </Typography>
        </div>
      </div>
    </div>
  );
}

LegalPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { LegalPage as UnstyledLegalPage };
export default withStyles(styles)(LegalPage);
