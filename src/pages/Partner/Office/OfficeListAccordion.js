import { makeStyles, withStyles } from "@material-ui/core/styles";

import { Box, Divider } from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";

export const Accordion = withStyles({
  root: {
    boxShadow: "none",

    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

export const AccordionSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: "auto",
    padding: "0",
    "&$expanded": {
      minHeight: "auto",
    },
    "& .MuiBox-root": {
      width: "100%",
    },
  },
  content: {
    margin: "0",
    "&$expanded": {
      margin: "0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

export const AccordionDetails = withStyles((theme) => ({
  root: {
    width: "100%",
    padding: "0",
  },
}))(MuiAccordionDetails);

const useStyle = makeStyles((theme) => ({
  Divider_wrap: {
    width: "100%",
  },
  Divider: {
    width: "95%",
    margin: "5px auto 0 auto",
  },
}));

export default function OfficeListAccordion({ expanded, onChange, children }) {
  const classes = useStyle();

  return (
    <Accordion square expanded={expanded} onChange={onChange}>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Box display="flex" flexDirection="column" alignItems="center">
          {!expanded ? (
            <Box
              className={classes.Divider_wrap}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <ExpandMoreIcon />
              <Divider className={classes.Divider} />
            </Box>
          ) : (
            <ExpandLessIcon />
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
