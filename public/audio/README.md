# Cinematic Audio Setup

Place your audio files in this directory.

## Recommended Audio

### Primary Ambient Track
- **Type**: Ambient nature soundscape / minimal drone
- **Mood**: Calm, atmospheric, mysterious
- **Length**: 2-5 minutes (loops)
- **Format**: MP3 (128-192kbps) or OGG
- **File name**: `ambient-swamp.mp3`

### Suggested Content
- Estonian forest ambience
- Gentle wind through trees
- Distant water sounds
- Subtle bird calls (sparse)
- Low drone or pad (optional)

## Where to Find Audio

### Free Sources (CC0 License)
1. **Freesound.org**
   - Search: "forest ambience", "swamp", "nature drone"
   - Filter: CC0 license

2. **Pixabay Audio**
   - Search: "ambient nature", "atmospheric"
   - All tracks are royalty-free

3. **YouTube Audio Library**
   - Genre: Ambient
   - Mood: Calm, Dark

### Paid Sources (Royalty-Free)
1. **Epidemic Sound** - $15/month
2. **Artlist** - $16.60/month
3. **AudioJungle** - Individual tracks $1-19

## Audio Specifications

### Format
```
Primary: MP3 (better compatibility)
Fallback: OGG (smaller size)
```

### Settings
```
Sample Rate: 44.1kHz or 48kHz
Bit Rate: 128-192kbps (good balance)
Channels: Stereo
```

### File Size
- Target: 2-5MB for 3-minute loop
- Compress if > 10MB

## Example Track Recommendations

### Perfectly Suited
1. "Nordic Forest Ambience"
2. "Misty Morning Soundscape"
3. "Atmospheric Drone - Calm"
4. "Estonian Nature Sounds"

### What to Avoid
- Loud music with melody
- Sudden volume spikes
- Human voices
- Obvious loops (crossfade them)

## Testing Checklist

- [ ] Audio loops seamlessly
- [ ] Volume is comfortable (not too loud)
- [ ] No click/pop at loop point
- [ ] File size < 10MB
- [ ] Works on mobile Safari
- [ ] Doesn't overpower experience

## Implementation

Once you have the file:
1. Place it in `/public/audio/`
2. Name it `ambient-swamp.mp3` (or update the path in `CinematicAudio.tsx`)
3. Test with the play button on the site
