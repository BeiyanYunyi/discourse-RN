import React from "react";
import { Image, useWindowDimensions, Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import WebView from "react-native-webview";
import { FAB, Portal, TouchableRipple } from "react-native-paper";

const ImageModal = ({
  src,
  imgHeight,
  imgWidth,
}: {
  src: string;
  imgHeight: number | undefined;
  imgWidth: number | undefined;
}) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { height, width } = useWindowDimensions();

  if (!visible)
    return (
      <TouchableRipple onPress={showModal}>
        <Image
          source={{ uri: src }}
          style={{ height: height / 4, width: width - 48 }}
        />
      </TouchableRipple>
    );

  return (
    <>
      <TouchableRipple onPress={showModal}>
        <Image
          source={{ uri: src }}
          style={{ height: height / 4, width: width - 48 }}
        />
      </TouchableRipple>
      <Portal>
        <Modal visible={visible} transparent onRequestClose={hideModal}>
          {(() => {
            if (imgHeight && imgWidth) {
              if (imgHeight > height * 4 || imgWidth > width * 4)
                return <WebView source={{ html: `<img src="${src}" />` }} />;
            }
            return (
              <ImageViewer
                imageUrls={[{ url: src }]}
                enableSwipeDown
                onCancel={hideModal}
                useNativeDriver
                renderIndicator={() => <></>}
              />
            );
          })()}
          <FAB
            icon="close"
            onPress={hideModal}
            style={{
              position: "absolute",
              margin: 16,
              right: 0,
              bottom: 0,
            }}
          />
        </Modal>
      </Portal>
    </>
  );
};

export default ImageModal;
