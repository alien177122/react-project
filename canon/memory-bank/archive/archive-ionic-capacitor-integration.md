# TASK ARCHIVE: Ionic + Capacitor Native Shells Integration

Comprehensive archive documentation for the completed implementation of Ionic React + Capacitor 7 shells.

## METADATA
- **Task ID:** `ionic-capacitor-integration`
- **Start Date:** June 21, 2026
- **Completion Date:** July 4, 2026
- **Complexity Level:** Level 3 (Intermediate)

## SUMMARY
Successfully integrated `@ionic/react` and Capacitor 7 into the monorepo root to compile the Vite + React web application into native iOS and Android packages, while maintaining structural compatibility with the existing Expo mobile track.

## REQUIREMENTS
- Set up `@ionic/react` with iOS adaptation styling.
- Establish a dynamic platform detection and API endpoint resolution layer.
- Integrate Capacitor 7 with app, status-bar, and splash-screen plugins.
- Create automated script bridges in `package.json` for compilation and Xcode/Android Studio syncing.
- Formulate comprehensive verification and developer guides.

## IMPLEMENTATION
The implementation maps across three key areas:
1. **Bootstrap & Ionic Theming:**
   - Initialized Ionic inside `index.tsx` via `initIonicReact` and `setupIonicReact({ mode: 'ios' })`.
   - Embedded `<IonApp>` directly wrapping `<AppShell />`.
   - Wrote `ionic-theme.css` to bridge CSS Custom Properties.
2. **Platform & API Layer:**
   - Built dynamic platform checks (`isNativeShell`, `getNativePlatform`).
   - Standardized dynamic api base resolution in `resolveApiBase.ts` which decodes `VITE_API_URL` based on host profiles.
3. **Capacitor Configuration & Scripts:**
   - Created `capacitor.config.ts` mapping the package id `com.stevegordiyenko.trainingcalculator` and `webDir: dist`.
   - Wrote npm scripts (`cap:sync`, `cap:ios`, `cap:android`, `cap:open:ios`, `cap:open:android`) to automate the workflow.

## TESTING
- **Automated Tests:** Verified Vitest unit testing suite. All 147 tests pass.
- **Static Verification:** Executed TypeScript compiler `tsc` check and build checks.
- **Manual Verification:** Tested bundle builds locally and successfully ran `npx cap sync`. Physical phone SE check requires Developer Mode setup.

## LESSONS LEARNED
- **Loopback Issues:** When testing mobile apps locally, the loopback IP (`127.0.0.1`) is self-referential to the device. Testing on local networks requires compiling the Vite app with the host Mac's Wi-Fi LAN IP explicitly mapped.
- **iOS Security Constraints:** Developer Mode must be manually turned on on physical iPhones under privacy settings to permit local debug deployments.

## REFERENCES
- **Reflection:** [reflection-ionic-capacitor-integration.md](file:///Users/steve_gordiyenko/Desktop/React_Project_Журнал_Сплит/memory-bank/reflection/reflection-ionic-capacitor-integration.md)
- **Reference Standard:** [ionic-capacitor-standard.md](file:///Users/steve_gordiyenko/Desktop/React_Project_Журнал_Сплит/memory-bank/reference/ionic-capacitor-standard.md)
