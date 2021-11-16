import React, { useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import AntSwitch from "appComponents/interaction/Antswitch";
import DialogPopup from "pages/Partner/Office/Dialog";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
const MenuPopupStyle = makeStyles((theme) => ({
  menuButton: {
    minWidth: "auto",
  },
  menuTxt: {
    fontSize: "13px",
    padding: "0",
    minHeight: "30px",
  },
  menuLink: {
    display: "block",
    padding: "0.2rem 1.2rem",
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

function MenuPopup(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = MenuPopupStyle();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setAnchorEl(null);
    props.delete();
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.menuButton}
      >
        <MoreVertIcon fontSize="small" className={classes.menuIcon} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={classes.menuTxt}>
          <Link
            to={props.editLink}
            onClick={handleClose}
            className={classes.menuLink}
          >
            수정
          </Link>
        </MenuItem>
        <MenuItem className={classes.menuTxt}>
          <span onClick={handleDelete} className={classes.menuLink}>
            삭제
          </span>
        </MenuItem>
      </Menu>
    </div>
  );
}
const OfficeListDropdownStyle = makeStyles((theme) => ({
  list_box: {
    display: "flex",
  },
  list_left: {
    width: "28%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 0px 0px 16px",
  },
  list_left_img: {
    width: "100px",
    height: "100px",
  },
  list_right: {
    width: "72%",
    color: theme.typography.main,
    paddingLeft: "16px",
    position: "relative",
    paddingBottom: "0",
  },
  list_top: {
    width: "100%",
    paddingBottom: "15px",
    position: "relative",
  },
  list_title: {
    fontSize: "15px",
    fontWeight: theme.typography.fontWeightMedium,
    paddingRight: "15px",
    letterSpacing: "-1px",
  },

  list_right_btn: {
    position: "absolute",
    top: "-4px",
    right: "-12px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  switch_icon: {
    position: "absolute",
    bottom: "1px",
    right: "16px",
  },
  edit_icon: {
    verticalAlign: "-4px",
  },
  txt_left: {
    width: "75px",
    textAlign: "left",
    color: theme.typography.dark,
    fontSize: "13px",
  },
  txt_right: {
    color: theme.typography.main,
    fontSize: "13px",
    fontWeight: theme.typography.fontWeightMedium,
    paddingBottom: "4px",
  },
  detail: {
    width: "85px",
    height: "22px",
    color: theme.typography.light,
    fontSize: "14px",
    borderRadius: "10px",
    marginTop: "8px",
    backgroundColor: theme.palette.primary.main,
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
  },
}));

export default function ListCard(props) {
  const { cardImage, title, detailLink, cardDetails, disableInteraction } =
    props;
  const classes = OfficeListDropdownStyle();
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [isActive, setIsActive] = useState(true);
  const popupClose = () => {
    setPopupOpen(false);
  };
  const handleChange = (event) => {
    setIsActive(event.target.checked);
  };
  function deletePopup() {
    setPopupOpen(true);
  }
  return (
    <Box className={classes.list_box}>
      <Box className={classes.list_left}>
        <img
          alt="image2"
          src={cardImage}
          className={classes.list_left_img}
          onDragStart={(e) => e.preventDefault()}
        />
        {detailLink && (
          <Link to={detailLink} className={classes.detail}>
            자세히보기
          </Link>
        )}
      </Box>
      <Box p={2} className={classes.list_right}>
        <Box className={classes.list_top} display="flex">
          <span className={classes.list_title}>{title}</span>
          <Box className={classes.list_right_btn}>
            {!disableInteraction && (
              <>
                <MenuPopup
                  editLink={props.editLink}
                  delete={deletePopup}
                ></MenuPopup>
              </>
            )}
          </Box>
        </Box>
        <Box>
          {cardDetails?.map((detail, idx) => (
            <Box key={idx} display="flex">
              <div className={classes.txt_left}>{detail.category}</div>
              <div className={classes.txt_right}>{detail.content}</div>
            </Box>
          ))}
        </Box>
        {!disableInteraction && (
          <Box className={classes.switch_icon}>
            <AntSwitch
              checked={isActive}
              onChange={handleChange}
              name="activation"
            />
          </Box>
        )}
      </Box>
      <Dialog
        open={popupOpen}
        fullWidth={true}
        onClose={popupClose}
        className={classes.popup}
        aria-labelledby="form-dialog-title"
      >
        <DialogPopup click={popupClose}></DialogPopup>
      </Dialog>
    </Box>
  );
}
