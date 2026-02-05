# Sharing AgeTech Connect to an iPhone (from Windows)

You're on **Windows** and need to get the app on an **iPhone** for someone who is **not technical** and **far away**. Here are two options.

---

## Option 1: Quick try-out (Expo Go) — No install, free

**Best for:** "I just want them to see the app once or try it quickly."

### What you do (on your Windows PC)

1. Install the tunnel dependency (one time):
   ```bash
   npx expo install @expo/ngrok
   ```
2. Start the app with a **tunnel** (so their iPhone can reach your PC over the internet):
   ```bash
   npx expo start --tunnel
   ```
3. In the terminal you’ll see a **QR code** and a **link** (e.g. `exp://xxxx.xxx.exp.direct:80`).
4. Send the **link** to the other person (email, WhatsApp, etc.).  
   Or send a **screenshot of the QR code** so they can scan it.

### What the non-tech person does (on their iPhone)

1. Install **Expo Go** from the App Store (search “Expo Go”).
2. Open the link you sent **in Safari** (not in Expo Go).  
   - Or open the **Camera** app and scan the QR code from your screenshot.  
   - iPhone will ask “Open in Expo Go?” → tap **Open**.
3. The app loads inside Expo Go. They can use it like the real app.

**Limitations:**

- Your computer must stay on and the `npx expo start --tunnel` command must keep running.
- They need internet each time they open the app.
- They see the app inside “Expo Go,” not as a standalone app icon.

---

## Option 2: Real app install (EAS Build) — One-time install, works like a normal app

**Best for:** “They should have it on their iPhone like a normal app, and I don’t want my PC on all the time.”

Expo builds your app in the **cloud** (so you don’t need a Mac). You then share **one link**; they install once and use the app like any other.

### What you do (on your Windows PC)

#### One-time setup

1. Create a free Expo account: https://expo.dev/signup  
2. Install EAS CLI and log in:
   ```bash
   npm install -g eas-cli
   eas login
   ```
3. Link this project to your Expo account (from the project folder):
   ```bash
   cd d:\agetech-connect
   eas build:configure
   ```
   (If it asks to create `eas.json`, say yes. You can keep the default profiles.)

#### Build for iPhone (internal / preview)

4. Start an **iOS** build for “preview” (internal testing):
   ```bash
   eas build --platform ios --profile preview
   ```
5. First time only, EAS will ask about **Apple credentials**:
   - **Register your Apple Developer account** (or create one at https://developer.apple.com — paid, about $99/year for real device installs).
   - Or choose **“Let Expo handle it”** for a limited free option (good for testing).
6. Wait for the build to finish (10–20 minutes). You’ll get a link in the terminal and on https://expo.dev (your project → Builds).

#### Share with the non-tech person

7. In **Expo dashboard** (expo.dev) → your project → **Builds** → click the latest **iOS** build.
8. You’ll see an **Install** link (or “Install on device”).  
   **Send that link** to the other person (email, WhatsApp, etc.).

### What the non-tech person does (on their iPhone)

1. Open the **link** you sent (in Safari or from Messages/email).
2. Tap **Install** (or “Install app”) and follow the prompts.
3. If asked, they may need to go to **Settings → General → VPN & Device Management** and trust the developer. Then open the app again.
4. After that, the app appears on their home screen like any other app. They don’t need Expo Go and your PC can be off.

---

## Summary

| | Option 1: Expo Go | Option 2: EAS Build |
|---|---|---|
| Your PC | Must stay on while they use it | Only needed to run the build; then can be off |
| Their iPhone | Install “Expo Go”, then open your link | Open your link once → install app → use like normal app |
| Cost | Free | Free build; Apple Developer account (~$99/year) needed for real device install |
| Best for | Quick demo / try-out | Giving them a “real” app to keep |

For a **non-tech person far away** who should **run it on iPhone** like a normal app, **Option 2 (EAS Build)** is the better long-term approach. Use **Option 1** only for a fast, one-off demo.
