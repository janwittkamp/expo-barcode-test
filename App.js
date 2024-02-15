import { StatusBar } from 'expo-status-bar';
import { CameraView, useCameraPermissions } from "expo-camera/next";
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useEffect } from 'react';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();

  const window = useWindowDimensions()

  useEffect(() => {
      if (permission?.status === "undetermined") {
          void requestPermission();
      }
  }, [permission?.status, requestPermission]);
  
  const handleScanned = (data) => {
      console.log("SCAN: ", data);
  };

  console.log(permission)

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <CameraView
        style={{ height: window.width, width: window.width, zIndex: 1000 }}
          barcodeScannerSettings={{ barCodeTypes: ["org.iso.DataMatrix"] }}
          onBarcodeScanned={handleScanned}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
