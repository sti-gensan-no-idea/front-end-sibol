import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

import ImgPanorama1 from "../assets/images/panorama_1.jpg";

export const PropertyPreviewPage = () => {
  return (
    <div>
      <ReactPhotoSphereViewer
        height={"100vh"}
        src={ImgPanorama1}
        width={"100%"}
      />
    </div>
  );
};
