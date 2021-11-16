import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  detailDiv: {
    width: "100%",
    marginBottom: "8px",
    display: "flex",
    flexWrap: "wrap",
  },
  detailTitle: {
    width: "19%",
    color: "darkgray",
    fontSize: "13px",
  },
  detailContent: {
    width: "81%",
    fontSize: "13px",
  },
}));

export function CarouselCardDetail(props) {
  const classes = useStyles(props);

  let condition;

  if (props.category === "옵션") {
    condition = true;
  }

  return (
    <div className={`${classes.detailDiv}`}>
      {condition ? (
        <p
          style={{ letterSpacing: "24px" }}
          className={`${classes.detail} ${classes.detailTitle}`}
        >
          {props.category}
        </p>
      ) : (
        <p className={`${classes.detail} ${classes.detailTitle}`}>
          {props.category}
        </p>
      )}

      <div className={`${classes.detail} ${classes.detailContent}`}>
        {props.children}
      </div>
    </div>
  );
}
