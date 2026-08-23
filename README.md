# Palai's Wedding Invitation

Digital wedding invitation for **Manoj Kumar & Sujitha**.

### Wedding
- **Date:** Sunday, 30 August 2026
- **Muhurtham:** 11:23 AM
- **Venue:** G.R.B. Gardens, Girnibavi, Duggondi, Warangal, Telangana

### GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, and `script.js`.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save and open the generated GitHub Pages URL.

The Google Maps button now uses the exact venue link supplied by the user: https://maps.app.goo.gl/1YCqvG3BT1rrkJj7A. The site also supports background music. Place a royalty-free MP3 named wedding-music.mp3 inside assets/.

The Telugu wording has been recreated from the supplied wedding-card image. Before publishing, proofread the Telugu text once against the printed card, particularly family names and the Sanskrit verse.


### Music
The supplied wedding music is included at `assets/wedding-music.mp3` and starts after the visitor presses **Open Invitation**. The music is 40.43 seconds long and is set to loop.


### Opening sequence
The opening uses the uploaded Ganesh temple video as the visual reference, followed by a Ganesh idol reveal and then the wedding invitation. Keep `assets/ganesh-temple-opening.mp4` and `assets/ganesh-idol.jpg` in the repository.


## Latest opening behavior
- The Ganesh temple video is muted.
- Only wedding-music.mp3 plays.
- The Ganesh reveal automatically transitions to the wedding invitation.
- The Edit Invitation panel has been removed.
