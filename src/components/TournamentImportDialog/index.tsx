import React, { useState, useEffect, useCallback } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";
import { useDropzone } from 'react-dropzone'
import tournamentImportDialogStyles from "./tournamentImportDialogStyles";
import { entityActions } from "../../redux/tournamentEntities/actions";
import { useDispatch } from "react-redux";

interface Props {
  // chooseFileButtonLabel: string,
  // deleteFileButtonLabel: string,
  // dropZonePlaceholder: string,
  // showButton: boolean,
  // showDeleteButton: boolean,
  open: boolean,
  onClose: () => void,
}

const TournamentImportDialog = (props: Props) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const classes = tournamentImportDialogStyles();

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const fr = new FileReader();
    fr.onload = (e: ProgressEvent<EventTarget & { result: any }>) => {
      var result = e?.target?.result && JSON.parse(e.target.result);
      // var formatted = JSON.stringify(result, null, 2);
          dispatch(entityActions.importTournament(result));
          props.onClose();
    }
    fr.readAsText(file);

  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'application/json', multiple: false, maxFiles: 1 })
  // const {
  //   width,
  //   height,
  //   imageWidth,
  //   imageHeight,
  //   //imageDefault,
  //   anySize,
  //   showButton,
  //   showDeleteButton,
  //   //fontSize,
  //   chooseFileButtonLabel,
  //   deleteFileButtonLabel,
  //   dropZonePlaceholder,
  // } = props;

  // const handleFile = (event) => {
  //   const { imagePicked } = props;

  //   const image = URL.createObjectURL(event.target.files[0]);
  //   const file = event.target.files[0];
  //   //setFile(file);
  //   setImage(image);
  //   imagePicked({ index: props.imageIndex, file, image });
  // };

  // const deleteFile = (event) => {
  //   const { imageDeleted, imagePicked } = props;

  //   imagePicked({ index: props.imageIndex, file: null, image: null });
  //   if (imageDeleted) {
  //     imageDeleted(props);
  //   }
  //   setImage(null);
  //   setDeleted(true);
  // };

  // const onDragOver = (event) => {
  //   event.preventDefault();
  // };

  // const onDragEnter = (event) => {
  //   setOver(true);
  // };

  // const onDragLeave = (event) => {
  //   setOver(false);
  // };

  // const onDrop = (event) => {
  //   event.preventDefault();
  //   const file = event.dataTransfer.files[0];

  //   const binaryData = [];
  //   binaryData.push(file);
  //   const image = URL.createObjectURL(
  //     new Blob(binaryData, { type: "application/zip" })
  //   );

  //   //const image = URL.createObjectURL(file);
  //   setImage(image);
  //   setOver(false);

  //   props.imagePicked({ index: props.imageIndex, file, image });
  // };

  // const  _onLoad = (event) => {
  //   const { naturalWidth, naturalHeight } = event.target;
  //   const { imageWidth, imageHeight, anySize } = this.props;

  //   if (
  //     !anySize &&
  //     ((imageWidth && imageWidth !== naturalWidth) ||
  //       (imageHeight && imageHeight !== naturalHeight))
  //   ) {
  //     this.setState({
  //       error: `Wrong image dimensions ${naturalWidth}x${naturalHeight}`,
  //       image: null,
  //     });
  //   } else {
  //     this.setState({ error: "" });
  //   }
  // };

  return (
    <Dialog open={props.open} onClose={props.onClose} classes={{ paper: classes.dialog }}>
      <DialogContent>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files
                
        {t('Please Confirm Your Action.')}
              </p>
          }
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="default" size='small' className={classes.dialogButton}>
          {t('Close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
//   return (
//     <div className="ms-Grid imagePicker-dropZone-container">
//       <div className="ms-Grid-row">
//         <div
//           onDrop={onDrop}
//           onDragOver={onDragOver}
//           onDragLeave={onDragLeave}
//           onDragEnter={onDragEnter}
//           className={`ms-Grid-col imagePicker-dropZone${over ? " hover" : ""}`}
//           style={Object.assign(
//             {},
//             {
//               width: `${width}px`,
//               height: `${height}px`,
//               backgroundImage: `url(${image ? image : ""})`,
//               backgroundRepeat: "no-repeat",
//               backgroundPosition: "center",
//               backgroundSize: "contain",
//             }
//           )}
//         >
//           {image === null && (
//             <div style={{ pointerEvents: "none" }}>
//               <div className="imagePicker-dropZone-placeholder">
//                 {!anySize ? (
//                   <div>
//                     {imageWidth} x {imageHeight}
//                   </div>
//                 ) : (
//                   <div className="ms-font-xxl">
//                     {dropZonePlaceholder || "Drop Here or paste from clipboard"}
//                   </div>
//                 )}
//                 <div>{error}</div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="ms-Grid-col">
//           {showButton ? (
//             <label for="imageInput" className="imagePicker-buttonContainer">
//               {chooseFileButtonLabel || strings.ChooseFile}
//               <input
//               id="imageInput"
//                 style={{ display: "none" }}
//                 type="file"
//                 accept="image/png, image/jpeg, image/gif, image/bmp, image/tiff, image/webp, image/svg+xml"
//                 value={image && image.file && image.file.name}
//                 onChange={handleFile}
//               />
//             </label>
//           ) : null}

//           {showDeleteButton ? (
//             <div className="button-container">
//               <label className="button">
//                 {deleteFileButtonLabel || strings.Delete}
//                 <button
//                   style={{ display: "none" }}
//                   type="button"
//                   onClick={deleteFile}
//                 />
//               </label>
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// };

export default TournamentImportDialog;