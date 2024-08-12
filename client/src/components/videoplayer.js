import React from 'react';
function generatePreviewLink(driveLink) {
    const index = driveLink.indexOf("/view");
    if (index !== -1) {
        return driveLink.substring(0, index) + "/preview";
    } else {
        return driveLink;  
    }
}
const Videoplayer=(props)=>{
    let previewLink = "";
    if (typeof props.videoUrl === 'number') {
        const num = props.videoUrl.toString(); // Convert to string for comparison
        if (num === "1") {
            previewLink = "https://drive.google.com/file/d/1aQHIKqWN7tMvuCZQDKMm4c2A7ltrnCl0/preview";
        } else if (num === "2") {
            previewLink = "https://drive.google.com/file/d/1YI_1-QcT78Dra3Es8QWenuOEtU06ypX5/preview";
        }
        else if (num === "3") {
            previewLink = "https://drive.google.com/file/d/15Io8YdJnoUgAxzjRs9XlVDq44WB9T8B2/preview";
        }
    } else {
        previewLink = generatePreviewLink(props.videoUrl);
    }
return(
    <>
    <div className='fullvideopage'>
    <div className='vedioplayer'>
                <iframe src={previewLink} width="100%" height="665px" allowFullScreen></iframe>
            </div>
    </div>
    </>
)
}
export default Videoplayer;