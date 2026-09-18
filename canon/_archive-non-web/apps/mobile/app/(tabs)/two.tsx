import {Redirect} from 'expo-router';

/** Legacy Expo template route — hidden from tab bar. */
export default function TwoRedirect() {
  return <Redirect href="/" />;
}
