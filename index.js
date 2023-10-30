/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { PaperProvider, configureFonts } from 'react-native-paper';
import App from './src/App';
import { name as appName } from './app.json';

export default function Main() {
  const baseFont = {
    fontFamily: 'PretendardVariable',
  }

  const baseVariants = configureFonts({ config: baseFont });
  
  return (
    <PaperProvider theme={{
      fonts: baseVariants
    }}>
      <App />
    </PaperProvider>
  );
}


AppRegistry.registerComponent(appName, () => Main);
