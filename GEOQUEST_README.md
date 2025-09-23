# 🗺️ GeoQuest - GPS Territory Capture Game

A web-based GPS territory capture game where players walk in real-world paths to create territories and compete for area control.

## 🎮 Game Overview

GeoQuest is a location-based game that uses your device's GPS to track your movement as you walk around in the real world. The goal is to capture territories by walking in complete circles and returning to your starting point.

## 🚀 Features

### ✅ Issues Fixed from Original Requirements

1. **🔐 Gemini API Integration** - Secure API key handling with local storage
   - Optional AI-powered territory suggestions and game tips
   - Configurable through the settings panel
   - No hardcoded API keys for security

2. **🎯 Territory Capture Logic** - Properly implemented polygon creation
   - Detects and prevents self-intersecting territories
   - Ensures polygons are properly closed by connecting back to start point
   - Validates territory completion before accepting

3. **⭕ Full Circle Game Mechanic** - Territories only created after completing circles
   - Players must return to within a configurable radius of their starting point
   - Real-time circle completion percentage tracking
   - Visual feedback when ready to complete territory

4. **🏁 Territory Lapping Prevention** - Handles opponent interference
   - Simulates other players capturing overlapping areas
   - Forces restart if another player "laps" your incomplete territory
   - Protects against incomplete territory exploitation

5. **📍 Enhanced Geolocation Error Handling** - Comprehensive GPS management
   - Permission request handling with user-friendly messages
   - GPS accuracy validation and warnings
   - Timeout and unavailability error recovery
   - Clear instructions for fixing common issues

6. **🔋 GPS Optimization** - Battery life and jitter reduction
   - Configurable minimum movement distance (1-20m) to filter GPS jitter
   - Adjustable update intervals (1-10 seconds) for battery optimization
   - Accuracy-based filtering to ignore poor GPS readings

## 🎯 How to Play

1. **Start the Game**
   - Open `geoquest.html` in a web browser
   - Allow location permissions when prompted
   - Click "Start Game" to begin GPS tracking

2. **Configure Settings** (Optional)
   - Set minimum movement distance to reduce GPS jitter
   - Adjust territory completion radius
   - Configure GPS update frequency for battery optimization
   - Add Gemini API key for AI features

3. **Capture Territory**
   - Walk around in the real world to create a path
   - The game tracks your GPS coordinates
   - Walk in a circle to create territory boundaries
   - Return to your starting point (within the completion radius)
   - Click "Complete Territory" when prompted

4. **Win Conditions**
   - Earn points based on territory area captured
   - Larger territories = higher scores
   - Avoid self-intersecting paths (invalid territories)
   - Watch out for opponent interference

## 🛠️ Technical Features

### GPS Tracking
- High-accuracy GPS positioning
- Real-time coordinate tracking
- Movement distance calculation using Haversine formula
- GPS jitter filtering with configurable thresholds

### Territory Validation
- Polygon self-intersection detection using line segment intersection algorithm
- Area calculation using the Shoelace formula
- Path closure validation ensuring complete circles
- Territory completion radius checking

### Game Mechanics
- Real-time path length calculation
- Circle completion percentage tracking
- Opponent territory simulation for testing
- Score system based on captured area

### User Interface
- Responsive design for mobile and desktop
- Real-time status updates
- Configurable game settings
- Comprehensive activity logging
- Dark theme optimized for outdoor use

## 🔧 Configuration Options

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| Minimum Movement Distance | 5m | 1-20m | Filters out GPS jitter by ignoring small movements |
| Territory Completion Radius | 50m | 20-200m | How close you need to be to starting point to complete |
| GPS Update Interval | 2s | 1-10s | How often GPS position is updated (affects battery) |
| Gemini API Key | None | - | Optional API key for AI-powered game features |

## 🌐 Browser Compatibility

- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari (iOS/macOS)
- ✅ Edge
- ❌ Internet Explorer (not supported)

**Requirements:**
- HTML5 Geolocation API support
- JavaScript enabled
- HTTPS or localhost (for geolocation permissions)

## 🚨 Privacy & Security

- **No data collection**: All game data stays on your device
- **Local storage only**: Settings and game state stored locally
- **Optional API integration**: Gemini API usage is entirely optional
- **Secure API handling**: No hardcoded API keys
- **Permission-based**: Only accesses GPS when explicitly granted

## 🐛 Troubleshooting

### GPS Issues
- **Permission Denied**: Enable location permissions in browser settings
- **Low Accuracy**: Ensure GPS is enabled and you have clear sky view
- **No Signal**: Check internet connection and GPS signal strength

### Game Issues
- **Territory Won't Complete**: Walk closer to your starting point
- **Path Self-Intersects**: Avoid crossing your previous path
- **High Battery Usage**: Increase GPS update interval in settings

## 🏗️ Development

The game is built as a single HTML file with embedded CSS and JavaScript:

- **HTML5**: Modern semantic structure
- **CSS3**: Responsive grid layouts, dark theme
- **Vanilla JavaScript**: No external dependencies
- **Web APIs**: Geolocation, Local Storage
- **Progressive Enhancement**: Graceful degradation for unsupported features

## 📱 Mobile Usage

For best mobile experience:
1. Use Chrome or Safari mobile browsers
2. Enable high-accuracy location in device settings
3. Keep screen on during gameplay
4. Consider battery optimization settings
5. Use HTTPS hosting for production deployment

---

**Created for the ClipBoard-Extension repository as part of GeoQuest GPS game implementation.**