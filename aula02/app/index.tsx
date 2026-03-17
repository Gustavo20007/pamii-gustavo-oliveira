import { CameraView, useCameraPermissions } from "expo-camera";
//importa a API da câmera

import * as MediaLibrary from "expo-media-library";
//importa a API da galeria

import { useRef, useState } from "react";
import { View, Button, Image, StyleSheet, Alert } from "react-native";

export default function Index() {

  const [cameraPermission, requestCameraPermission] = useCameraPermissions(); //pede permissão da câmera
  const cameraRef = useRef<any>(null);
  const [photo, setPhoto] = useState<any>(null);

  async function takePicture() {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync(); //Tira a foto
      

      setPhoto(result);
     
    }
  }

  async function savePhoto() {

    const { status } = await MediaLibrary.requestPermissionsAsync();
    // aqui pede permissão da galeria

    if (status !== "granted") {
      Alert.alert("Permissão negada");
      return;
    }

    if (photo) {
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      //salva a foto

      Alert.alert("Foto salva na galeria!");
    }
  }

  if (!cameraPermission?.granted) {
    return (
      <View style={styles.center}>
        <Button title="Permitir câmera" onPress={requestCameraPermission} />
        {/* botão para liberar câmera */}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>

      {!photo ? (
        <CameraView
          style={{ flex: 1 }}
          ref={cameraRef}
        />
        // mostra a câmera
      ) : (
        <Image
          source={{ uri: photo.uri }}
          style={{ flex: 1 }}
        />
        // mostra a foto
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

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
   
  },

  buttons: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    gap: 10
   
  }

});