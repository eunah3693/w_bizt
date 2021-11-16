import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { resizeImage } from "utility/imageHandler";
import { app_setProgressBar } from "utility/ApplicationInterface";

const ImgUploadStyle = makeStyles((theme) => ({
  btn_wrap: {
    width: "86px",
    height: "86px",
    position: "relative",
    marginRight: "10px",
  },
  input_wrap: {
    width: "86px",
    height: "86px",
    position: "relative",
    marginRight: "10px",
  },
  btn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: "86px",
    height: "86px",
    backgroundColor: theme.typography.dark,
    color: theme.typography.light,
  },
  input: {
    position: "absolute",
    left: "0",
    top: "0",
    width: "86px",
    height: "86px",
    opacity: "0",
  },
  upload_image: {
    display: "flex",
    overflowX: "auto",
    width: "100%",
    height: "86px",
  },
  image: {
    marginRight: "10px",
    width: "86px",
    height: "86px",
    objectFit: "fill",
  },
  btn_remove: {
    position: "absolute",
    right: "0px",
    top: "0",
    zIndex: "1",
    color: theme.typography.dark,
    width: "20px",
    height: "20px",
    backgroundColor: theme.typography.dark,
    borderRadius: "50%",
    boxShadow: `0 0 2px ${theme.typography.main}`,
  },
  btn_remove_icon: {
    color: theme.typography.light,
  },
  popup_title: {
    fontSize: "15px",
    fontWeight: "500",
  },
}));

var filesToUpload = [];

const uploadFiles = (file, total, imgs, setImgs, fileContainer) => {
  filesToUpload.push(file);

  // 전역변수에 업데이트 될 이미지들을 채워넣고 그 수가 다 차면 해당 이미지로 state 변수를 set한다.
  if (filesToUpload.length === total) {
    let urlArr = filesToUpload.map((file) => URL.createObjectURL(file));
    setImgs(imgs.concat(urlArr));
    filesToUpload.forEach((item) => {
      fileContainer.push(item);
    });
    filesToUpload = [];
    app_setProgressBar(false);
  }
};

var rmvImgIdx;

const removeFile = (imgs, setImgs, fileContainer) => {
  imgs.splice(rmvImgIdx, 1);
  setImgs([...imgs]);

  let addedFrom = imgs.length - fileContainer.length;
  if (rmvImgIdx - addedFrom >= 0) {
    fileContainer.splice(rmvImgIdx - addedFrom, 1);
  }
};
/**
 * imgs를 통해 url의 배열을 받고 이를 이미지 리스트로 출력한다.
 * onUpload를 통해 함수 (file) => {} 를 받고 이미지가 업로드 될 시 실행한다.
 * onRemove를 통해 함수 (idx) => {} 를 받고 이미지가 삭제될 시 실행한다.
 * @param {srcs, onUpload} props
 * @returns
 */
export default function ImgUpload({ imgs, setImgs, fileContainer }) {
  const classes = ImgUploadStyle();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.upload_image}>
      <div className={classes.input_wrap}>
        <input
          type="file"
          accept="image/*"
          multiple
          id="file"
          className={classes.input}
          onChange={(e) => {
            app_setProgressBar(true);
            debugger;
            let targetFiles = e.target.files;
            let total = targetFiles.length;
            targetFiles.forEach((file, index) => {
              resizeImage(file, (resizedFile) =>
                uploadFiles(resizedFile, total, imgs, setImgs, fileContainer)
              );
            });
            e.target.value = null;
          }}
        />
        <div className={classes.btn}>
          <AddCircleIcon fontSize="large" />
        </div>
      </div>
      <div className={classes.upload_image}>
        {imgs?.map((imgUrl, idx) => {
          return (
            <div
              className={classes.btn_wrap}
              key={idx}
              onClick={() => {
                rmvImgIdx = idx;
                setOpen(true);
              }}
            >
              <img alt="room" src={imgUrl} className={classes.image} />
              <div className={classes.btn_remove}>
                <CloseIcon
                  className={classes.btn_remove_icon}
                  fontSize="small"
                />
              </div>
            </div>
          );
        })}
      </div>
      <Dialog
        disableScrollLock
        fullWidth={true}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <span className={classes.popup_title}>
            이미지를 삭제하시겠습니까?
          </span>
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            취소
          </Button>
          <Button
            onClick={() => {
              removeFile(imgs, setImgs, fileContainer);
              setOpen(false);
            }}
            color="primary"
          >
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
