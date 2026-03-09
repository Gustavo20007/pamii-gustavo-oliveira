import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useRef, useState } from "react";
import { View, Button, Image, StyleSheet } from "react-native";

export default function Index() {

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

  const cameraRef = useRef<any>(null);
  const [photo, setPhoto] = useState<any>(null);

  async function takePicture() {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      setPhoto(result);
    }
  }

  async function savePhoto() {

    if (!mediaPermission?.granted) {
      await requestMediaPermission();
    }

    if (photo) {
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      alert("Foto salva na galeria!");
    }
  }

  if (!cameraPermission?.granted) {
    return (
      <View style={styles.center}>
        <Button title="Permitir câmera" onPress={requestCameraPermission} />
      </View>
    );
  }

  return (
    <View style={{flex:1}}>

      {!photo ? (
        <CameraView
          style={{flex:1}}
          ref={cameraRef}
        />
      ) : (
        <Image
          source={{uri:photo.uri}}
          style={{flex:1}}
        />
      )}

      <View style={styles.buttons}>

        {!photo ? (
          <Button title="Tirar Foto" onPress={takePicture} />
        ) : (
          <>
            <Button title="Salvar Foto" onPress={savePhoto} />
            <Button title="Tirar Outra" onPress={() => setPhoto(null)} />
          </>
        )}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  buttons:{
    position:"absolute",
    bottom:80,
    alignSelf:"center",
    gap:10
  }

});